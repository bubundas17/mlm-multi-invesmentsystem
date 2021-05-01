const express = require('express');
const router = express.Router();

const Investment = require("../../models/Investments");
const Withdrawl = require("../../models/Withdrawal");
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
const Settings =  require("./settings");

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
router.use("/settings", Settings);

router.get('/', authenticated, async (req, res) => {
  let investments = await Investment.find({status: config.consts.PACKAGE_STATUS_ACTIVE}).sort({created: -1}).limit(10).populate("user", "name")
  let withdrawal = await Withdrawl.find({status: config.consts.WITHDRAWAL_STATUS_COMPLETED}).sort({_id: -1}).limit(10).populate("user", "name")
  res.send({investments, withdrawal})
});



module.exports = router;
