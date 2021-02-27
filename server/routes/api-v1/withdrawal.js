const authenticated = require("../../controllers/authenticated");

const express = require('express');
const router = express.Router();
const WithdrawalDB = require("../../models/Withdrawal");
const InvoiceDb = require("../../models/Invoice");
const UserDB = require("../../models/User");
const config = require("../../config");
const util = require("../../lib/util");


router.get("/", authenticated, async (req, res) => {
  try {
    let withdrawal = await WithdrawalDB.find({user: req.user._id}).sort({_id: -1})
    res.send({withdrawals: withdrawal})
  } catch (e) {
    res.status(400).send({error: 1})
  }

})

router.post("/", authenticated, async (req, res) => {
  let description = req.body.description;
  let amount = req.body.amount;
  // console.log(req.body)
  try {
    let user = await UserDB.findById(req.user._id);
    // Got The User
    if (user.balance >= amount) {
      // User Have Enough Balance
      await WithdrawalDB.create({
        user: req.user._id,
        amount: amount,
        description: description
      })
      await InvoiceDb.create({
        user: req.user._id,
        title: "Withdrawal Req Submitted ",
        description: `Withdrawal Req Submitted.`,
        txnType: config.consts.INVOICE_TYPE_DEBIT,
        finalAmount: amount
      })
      await UserDB.findByIdAndUpdate(req.user._id, {$inc: {balance: -amount}})
      res.send({message: "Success!"})
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({error: "Unknown Error."})
  }
})

router.get("/all", async (req, res) => {
  try {
    let withdrawal = await WithdrawalDB.find({}).populate("user")
    res.send({withdrawal})
  } catch (e) {
    res.status(400).send({error: 1})
  }
})

router.get("/pending", async (req, res) => {
  try {
    let withdrawal = await WithdrawalDB.find({status: config.consts.WITHDRAWAL_STATUS_PROCESSING}).populate("user")
    res.send({withdrawal})
  } catch (e) {
    res.status(400).send({error: 1})
  }
})

router.get("/:id", async (req, res) => {
  try {
    let withdrawal = await WithdrawalDB.findById(req.params.id).populate("user")
    res.send({withdrawal})
  } catch (e) {
    res.status(400).send({error: 1})
  }
})

// router.post("/:id", async (req, res) => {
//   let action = req.body.action;
//   let refund = req.body.refund;
//
//   // WithdrawalDB.findByIdAndUpdate
//
//   if (action == "success") {
//     await WithdrawalDB.findByIdAndUpdate(req.params.id, {status: config.consts.WITHDRAWAL_STATUS_COMPLETED})
//     return res.send({message: "Success"})
//   }
//   if (action == "failed") {
//     await WithdrawalDB.findByIdAndUpdate(req.params.id, {status: config.consts.WITHDRAWAL_STATUS_FAILED})
//     return res.send({message: "Success"})
//   }
//
//   if (action == "cancelled") {
//     await WithdrawalDB.findByIdAndUpdate(req.params.id, {status: config.consts.WITHDRAWAL_STATUS_CANCELLED})
//     return res.send({message: "Cancelled"})
//   }
//
//
// })


router.post("/:id/completed", async (req, res) => {
  // let action = req.body.action;

  try {
    await WithdrawalDB.findByIdAndUpdate(req.params.id, {status: config.consts.WITHDRAWAL_STATUS_COMPLETED})
    // util.sendSMS(userData.phone, `Hi, ${userData.name}\n Your The Truth Club Account's Password has been changed. If you didn't did it, Contact support as soon as possible.`)
    res.send({message: "Success"})
  } catch (e) {
    res.status(500).send({message: "Success"})
  }


})

router.post("/:id/failed", async (req, res) => {
  // let action = req.body.action;
  try {
    let wreq = await WithdrawalDB.findById(req.params.id)

    await await WithdrawalDB.findByIdAndUpdate(req.params.id, {status: config.consts.WITHDRAWAL_STATUS_FAILED, refunded: true})
    if(!wreq.refunded) {
      await InvoiceDb.create({
        user: wreq.user,
        title: "Withdrawal failed Refund",
        description: `Refund For Failed Withdrawal Request.`,
        txnType: config.consts.INVOICE_TYPE_CREDIT,
        finalAmount: wreq.amount
      })
      await UserDB.findByIdAndUpdate(wreq.user, {$inc: {balance: wreq.amount}})
    }

    res.send({message: "Success"})
  } catch (e) {
    res.status(500).send({message: "Success"})
  }
})

module.exports = router;
