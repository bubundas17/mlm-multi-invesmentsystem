const authenticated = require("../../controllers/authenticated");

const express = require('express');
const router = express.Router();
const WithdrawalDB = require("../../models/Withdrawal");
const config = require("../../config");



router.get("/", authenticated, async (req,res) => {
  try {
    let withdrawal = await WithdrawalDB.find({user: req.user._id}).sort({_id:-1})
    res.send({withdrawals: withdrawal})
  } catch (e) {
    res.status(400).send({error: 1})
  }

})



router.get("/all", async (req, res) => {
  try {
    let withdrawal = await WithdrawalDB.find({})
    res.send({withdrawal})
  } catch (e) {
    res.status(400).send({error: 1})
  }
})

router.get("/pending", async (req, res) => {
  try {
    let withdrawal = await WithdrawalDB.find({status: config.consts.WITHDRAWAL_STATUS_PROCESSING})
    res.send({withdrawal})
  } catch (e) {
    res.status(400).send({error: 1})
  }
})

router.get("/:id", async (req, res) => {

})

router.post("/:id", async (req, res) => {
  let action = req.body.action;
  let refund = req.body.refund;

  // WithdrawalDB.findByIdAndUpdate

  if (action == "success") {
    await WithdrawalDB.findByIdAndUpdate(req.params.id, {status: config.consts.WITHDRAWAL_STATUS_COMPLETED})
    return res.send({message: "Success"})
  }
  if (action == "failed") {
    await WithdrawalDB.findByIdAndUpdate(req.params.id, {status: config.consts.WITHDRAWAL_STATUS_FAILED})
    return res.send({message: "Success"})
  }

  if (action == "cancelled") {
    await WithdrawalDB.findByIdAndUpdate(req.params.id, {status: config.consts.WITHDRAWAL_STATUS_CANCELLED})
    return res.send({message: "Cancelled"})
  }


})


module.exports = router;
