const express = require('express');
const InvesmentDB = require("../../models/Investments");
const Voucher = require("../../models/Voucher");
const authenticated = require('../../controllers/authenticated');
const Invoice = require("../../models/Invoice");
const config = require("../../config");
const UserDB = require("../../models/User");
const numberListGenerator = require("../../lib/numberListGenerator");
// const util =  require("../../lib/util")

const Razorpay = require("razorpay");

const util = require("../../lib/util");

const router = express.Router();

router.get("/", authenticated, async (req, res) => {
  try {
    let investments = await InvesmentDB.find({user: req.user._id}).lean()
    investments = investments.map(rec => {
      return {
        spinAvailable: util.isSpinAvailable(rec),
        spinsLeft: util.daysBetween(rec.startDate, rec.endDate) - util.weekDays(rec.startDate, rec.endDate),
        ...rec
      }
    })
    res.send({investments});

  } catch (e) {
    res.status(400).send({error: 1})
  }
})


router.post("/:id/spin", authenticated, async (req, res) => {
  let investment = await InvesmentDB.findOne({user: req.user._id, _id: req.params.id})
  if (!investment) return res.status(404).send({error: "Not Found."})
  // console.log(investment);

  if (!util.isSpinAvailable(investment)) return res.status(401).send({error: "Spin Not Available Today!"})
  let todaySpin = util.getTodaySpin(investment)
  console.log(todaySpin);
  let spins = investment.spins;
  let completedSpins = investment.completedSpins;
  completedSpins[todaySpin] = true;
  let percentage = spins[todaySpin];

  let creditAmount = investment.amount * ((percentage) / 100)
  creditAmount = creditAmount.toFixed(2)
  await Invoice.create({
    user: req.user._id,
    title: "Spin Credit!",
    description: "Spin Credit for " + percentage + "% Score!",
    finalAmount: creditAmount,
    txnType: config.consts.INVOICE_TYPE_CREDIT
  })
  await UserDB.findByIdAndUpdate(req.user._id, {$inc: {balance: creditAmount}})
  await InvesmentDB.findByIdAndUpdate(req.params.id, {$set: {completedSpins: completedSpins}})
  res.send({
    percentage,
    creditAmount
  })
})

router.post("/buy", authenticated, async (req, res) => {
  let payment = req.body.payment;
  let amount = req.body.amount;
  let rPay = new Razorpay({
    key_id: config.razorpay.key,
    key_secret: config.razorpay.key_secret,
  })

  try {
    let paymentres = await rPay.payments.capture(payment.razorpay_payment_id, amount, "INR")
    if (paymentres.status === "captured") {

      let startDay = new Date();
      let stopDay = new Date();
      startDay.setHours(0, 0, 0, 0);
      stopDay.setHours(0, 0, 0, 0);

      startDay.setDate(startDay.getDate() + 2);
      stopDay.setDate(stopDay.getDate() + 44);

      await InvesmentDB.create({
        user: req.user._id,
        amount: paymentres.amount / 100,
        completedSpins: util.emptyArray(42),
        spins: numberListGenerator(config.WEEL_NUMBERS, 42, 140),
        status: config.consts.PACKAGE_STATUS_ACTIVE,
        startDate: startDay,
        endDate: stopDay
      })
      await UserDB.findByIdAndUpdate(req.user._id, {
        $inc: {maxRefBonus: paymentres.amount / 100 * config.MLM_MAXREFER_EARNING_MULTIPLAYER},
        $set: {isActive: true}
      })

      let CurrentUser = await UserDB.findById(req.user._id).populate("uptree");
      for (let index in CurrentUser.uptree) {
        let percentage = config.MLM_PERCENTAGES[index];
        let upUser = CurrentUser.uptree[index];
        let level = index;
        level = (level/1) + 1
        let topUpAmount = paymentres.amount / 100 * ((percentage) / 100)
        topUpAmount = Math.floor(topUpAmount)
        if (upUser.isActive && ((upUser.maxRefBonus - upUser.totalRefBonus) >= topUpAmount)) {
          // User have enough credit room
          await Invoice.create({
            user: upUser._id,
            title: "Referral Bonus for investment at lvl " + (level),
            description: `Refer bonus credit for new investment purchase at lvl ${ (level)} of ${paymentres.amount / 100} INR`,
            txnType: config.consts.INVOICE_TYPE_CREDIT,
            finalAmount: topUpAmount
          })
          await UserDB.findByIdAndUpdate(upUser._id, {$inc: {refBalance: topUpAmount, totalRefBonus: topUpAmount}})
        }
      }
      res.send({message: "ok"})
    }
    else  {
      res.status(400).send({error: "Payment Failed."})
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({error: "Payment Failed."})
  }

  // console.log(await  );
})

router.post("/redeem", async (req, res) => {
  let voucher = req.body.voucher;
  // console.log(voucher)
  if (!voucher || typeof voucher != "string") return res.status(400).send({
    error: 1,
    message: "Please enter voucher Code."
  });
  voucher = voucher.toLowerCase();
  let voucherdata = await Voucher.findOne({code: voucher});
  if (!voucherdata) return res.status(400).send({error: 1, message: "Invalid Voucher Code."});
  if (String(voucherdata.status) !== String(config.consts.VOUCHER_ACTIVE)) return res.status(400).send({
    error: 1,
    message: "Voucher Is USED."
  });
  try {
    // await Invoice.create({
    //   title: "Voucher Code Redeem",
    //   description: `Voucher code successfully redeemed!`,
    //   txnType: config.consts.INVOICE_TYPE_CREDIT,
    //   user: req.user._id,
    //   finalAmount: voucherdata.amount,
    // });
    // Set Voucher Used
    await Voucher.findByIdAndUpdate(voucherdata._id, {
      $set: {
        status: config.consts.VOUCHER_USED,
        usedBy: req.user._id
      }
    });

    // Order Plan
    // Increase Amount In User
    // await UserDB.findByIdAndUpdate(req.user._id, {$inc: {balance: voucherdata.amount}});
    // await InvesmentDB.create({
    //   user: req.user._id,
    //   amount: voucherdata.amount,
    //   spins: numberListGenerator(config.WEEL_NUMBERS, 48, 140),
    //   status: config.consts.PACKAGE_STATUS_ACTIVE,
    //   completedSpins: util.emptyArray(140)
    // })



    let startDay = new Date();
    let stopDay = new Date();
    startDay.setHours(0, 0, 0, 0);
    stopDay.setHours(0, 0, 0, 0);

    startDay.setDate(startDay.getDate() + 2);
    stopDay.setDate(stopDay.getDate() + 44);

    await InvesmentDB.create({
      user: req.user._id,
      amount: voucherdata.amount,
      completedSpins: util.emptyArray(42),
      spins: numberListGenerator(config.WEEL_NUMBERS, 42, 140),
      status: config.consts.PACKAGE_STATUS_ACTIVE,
      startDate: startDay,
      endDate: stopDay
    })
    await UserDB.findByIdAndUpdate(req.user._id, {
      $inc: {maxRefBonus: voucherdata.amount * config.MLM_MAXREFER_EARNING_MULTIPLAYER},
      $set: {isActive: true}
    })

    let CurrentUser = await UserDB.findById(req.user._id).populate("uptree");
    for (let index in CurrentUser.uptree) {
      let percentage = config.MLM_PERCENTAGES[index];
      let upUser = CurrentUser.uptree[index];
      let level = index;
      level = (level/1) + 1
      let topUpAmount = voucherdata.amount * ((percentage) / 100)
      topUpAmount = Math.floor(topUpAmount)
      if (upUser.isActive && ((upUser.maxRefBonus - upUser.totalRefBonus) >= topUpAmount)) {
        // User have enough credit room
        await Invoice.create({
          user: upUser._id,
          title: "Referral Bonus for investment at lvl " + (level),
          description: `Refer bonus credit for new investment purchase at lvl ${ (level)} of ${voucherdata.amount} INR`,
          txnType: config.consts.INVOICE_TYPE_CREDIT,
          finalAmount: topUpAmount
        })
        await UserDB.findByIdAndUpdate(upUser._id, {$inc: {refBalance: topUpAmount, totalRefBonus: topUpAmount}})
      }
    }
    res.send({message: "ok"})
    // res.send({message: "Voucher Redeem Success!"})
  } catch (e) {
    console.trace(e, "Error While Code Redeem");
    res.status(500).send({error: 1, message: "Error In Redeeming Code."})
  }
})

module.exports = router;
