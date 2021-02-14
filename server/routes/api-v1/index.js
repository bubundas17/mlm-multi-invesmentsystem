const express = require('express');
const router = express.Router();

const LicenseDB = require("../../models/License");
const config = require("../../config");


const Auth = require("./auth");
const Wallet = require("./wallet");
const Voucher = require("./vouchers");
const Invoices = require("./invoices");
const Profile = require("./profile");
const Users = require("./users");
const Refer = require("./refer");
const Kyc = require("./kyc");
const Investments =  require("./investments");
const Withdrawal =  require("./withdrawal");

const authenticated = require("../../controllers/authenticated");

router.use("/auth", Auth);
router.use("/wallet", Wallet);
router.use("/vouchers", Voucher);
router.use("/invoices", Invoices);
router.use("/profile", Profile);
router.use("/users", Users);
router.use("/refer", Refer);
router.use("/kyc", Kyc);
router.use("/investments", Investments);
router.use("/withdrawal", Withdrawal);

router.get('/', authenticated, async (req, res) => {
  let licenseCount = await LicenseDB.find({user: req.user._id, status: config.consts.LICENSE_STATUS_ACTIVE}).count();
  // console.log(licenseCount)
  res.json({licenseCount})
});



module.exports = router;
