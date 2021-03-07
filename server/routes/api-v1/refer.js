const express = require('express');
const router = express.Router();
const User = require("../../models/User");
const Invoice = require("../../models/Invoice");
const authenticated = require('../../controllers/authenticated');
const config = require("../../config")

router.get("/", authenticated, async (req, res) => {
  let total = User.find({uptree: req.user._id}).count();
  let completed = User.find({uptree: req.user._id, isActive: true}).count();
  let pending = User.find({uptree: req.user._id, isActive: {$ne: true}}).count();
  let users = User.find({uptree: req.user._id}).lean();

  total = await total;
  completed = await completed;
  pending = await pending;
  users = await users;
  users = users.map(data => {
    return {
      name: data.name,
      username: data.username,
      uptree: data.uptree,
      isActive: data.isActive
    }
  })
  res.send({
    total, completed, pending, users
  })
});

router.post("/transfer", authenticated, async (req, res) => {
  try {
    let user = await User.findById(req.user._id);
    if(user.refBalance > 10) {
      await User.findByIdAndUpdate(req.user._id, {$inc: {balance: Math.abs(user.refBalance), refBalance: -Math.abs(user.refBalance)}})
      await Invoice.create({
        user: req.user._id,
        title: "Transfer from refer to user.",
        finalAmount: Math.abs(user.refBalance),
        txnType: config.consts.INVOICE_TYPE_CREDIT
      })
    }
    res.send({message: "OK"})
  } catch (e) {
    console.log(e)
    res.status(500).send({message: "error"})
  }
})


module.exports = router;
