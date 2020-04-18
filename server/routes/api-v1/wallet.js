const express = require('express');
const router = express.Router();
const UserDB = require("../../models/User");
const Invoice = require("../../models/Invoice");
const Voucher = require("../../models/Voucher");
const config = require("../../config");

const extractuser = require("../../controllers/extractUser");
const authenticated = require("../../controllers/authenticated");

router.use(extractuser);
router.use(authenticated);

router.get("/", async (req, res) => {
  let user = await UserDB.findById(req.user.id);
  res.send({user})
});


router.post("/send", async (req, res) => {
  let username = req.body.username;
  let amount = req.body.amount;
  if (!username) return res.status(500).send({message: "Enter A username"});
  if (!amount) return res.status(500).send({message: "Enter A amount"});

  if(!req.user.kycVerified) return res.status(500).send({message: "Please Verify KYC First"});

  let user = await UserDB.findById(req.user._id);
  let RecUser = await UserDB.findOne({username: username});

  if (!RecUser) return res.status(500).send({message: "User Not Found!"});
  if (Number(user.balance) < Number(amount)) return res.status(500).send({message: "Not enough balance!"});

  amount = Number(amount);
  amount = Math.abs(amount);


  try {
    await Invoice.create({
      title: "Coins Received from " + user.username,
      description: `Coins Received successfully!`,
      txnType: config.consts.INVOICE_TYPE_CREDIT,
      user: RecUser._id,
      finalAmount: amount,
    });
    await UserDB.findByIdAndUpdate(RecUser._id, {$inc: {balance: amount}});


    await Invoice.create({
      title: "Coins Sent to " + RecUser.username,
      description: `Coins Received successfully!`,
      txnType: config.consts.INVOICE_TYPE_DEBIT,
      user: user._id,
      finalAmount: amount,
    });
    await UserDB.findByIdAndUpdate(user._id, {$inc: {balance: - amount}});

    res.send({message: "Voucher Redeem Success!"})

  } catch (e) {
    console.trace(e, "Error While Code Redeem");
    res.status(500).send({error: 1, message: "Error In sending money"})
  }


});


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
    await Invoice.create({
      title: "Voucher Code Redeem",
      description: `Voucher code successfully redeemed!`,
      txnType: config.consts.INVOICE_TYPE_CREDIT,
      user: req.user._id,
      finalAmount: voucherdata.amount,
    });
    // Set Voucher Used
    await Voucher.findByIdAndUpdate(voucherdata._id, {
      $set: {
        status: config.consts.VOUCHER_USED,
        usedBy: req.user._id
      }
    });
    // Increase Amount In User
    await UserDB.findByIdAndUpdate(req.user._id, {$inc: {balance: voucherdata.amount}});
    res.send({message: "Voucher Redeem Success!"})
  } catch (e) {
    console.trace(e, "Error While Code Redeem");
    res.status(500).send({error: 1, message: "Error In Redeeming Code."})
  }
});

module.exports = router;
