const express = require('express');
const router = express.Router();
const uuid = require('uuid/v4');
const Vouchers = require("../../models/Voucher");
const adminOnly = require("../../controllers/adminOnly");


router.post("/",adminOnly, async (req, res) => {
  let uuidgen = uuid();
  let amount = Number(req.body.amount);
  if(!amount) return res.status(500).send({error: 1, message: "Please Enter Amount."});
  let voucher = await Vouchers.create({
    code: uuidgen,
    amount: amount,
    createdBy: req.user._id,
    status: "ACTIVE"
  });
  res.send({voucher})
});

router.get("/", adminOnly, async (req, res) => {
  let vouchers = await Vouchers.find().sort({"_id": -1}).populate("createdBy", "username").populate("usedBy", "username");
  res.send({vouchers})
});

module.exports = router;
