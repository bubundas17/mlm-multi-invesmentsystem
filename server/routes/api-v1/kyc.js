const express = require('express');
const router = express.Router();
const multer = require("multer");
const Kyc = require("../../models/Kyc");
const User = require("../../models/User");
const Invoice = require("../../models/Invoice");
const authenticated = require('../../controllers/authenticated');
const admin = require('../../controllers/adminOnly');
const config = require("../../config");
const fs = require('fs');
const util = require("../../lib/util");

function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

router.get("/", authenticated, admin, async (req, res) => {
  let kycs = await Kyc.find().populate("user", "username name");
  res.send({kycs}); // []
});

router.get("/pending", authenticated, admin, async (req, res) => {
  let kycs = await Kyc.find({pending: true}).populate("user", "username name");
  res.send({kycs}); // []
});


router.use("/uploads", express.static(__dirname + "/../../uploads"));

router.post("/submit-kyc", authenticated, multer().array("image", 2), async function (req, res) {
  if(!req.files || req.files.length !==2) return res.status(400).send({message: "Please Select Both Files"});

  // console.log("body: ", req.body);
  // console.log("files:", req.files);
  let filename = makeid(20);
  // filename += ".jpg";

  await Kyc.create({
    user: req.user,
    filename: filename
  });

  fs.writeFileSync(__dirname + `/../../uploads/${filename}-1.jpg`, req.files[0].buffer);
  fs.writeFileSync(__dirname + `/../../uploads/${filename}-2.jpg`, req.files[1].buffer);

  return res.send({
    status: "OK"
  });
});


router.get("/:id", authenticated, admin, async (req, res) => {
  let kycId = req.params.id;
  let kyc = await Kyc.findById(kycId).populate("user", "name username email phone");
  res.send({kyc})
});

router.post("/:id/accept", authenticated, admin, async (req, res) => {
  let kycId = req.params.id;
  let kyc = await Kyc.findById(kycId);
  let user = await User.findById(kyc.user);
  kyc.verified = true;
  kyc.pending = false;
  kyc.save();
  if(user.kycVerified) return res.send({message: "KYC Already Verified!"});

  user.kycVerified = true;
  user.save();

  // util.sendSMS(user.phone, `Hi, ${user.name}\n Good NEWS!\nYour KYC Verification is now completed.`)

  // if(user.referredBy) {

    // let RefUser = await User.findById(user.referredBy);
    // RefUser.balance = Number(RefUser.balance) + Number(config.referralBonus);
    // RefUser.save();
    // await Invoice.create({
    //   title: "Referral Successful",
    //   user: RefUser._id,
    //   description: `Referral Bonus Credit For ${user.username}`,
    //   txnType: config.consts.INVOICE_TYPE_CREDIT,
    //   finalAmount: config.referralBonus
    // })
  // }

  res.send({message: "OK"})
});

router.post("/:id/reject", authenticated, admin, async (req, res) => {
  let kycId = req.params.id;
  let kyc = await Kyc.findByIdAndUpdate(kycId, {$set: {pending: false, declined: true}});

  res.send({message: "OK"})
});


module.exports = router;
