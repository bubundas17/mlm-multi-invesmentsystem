const express = require('express');
const router = express.Router();
const User = require("../../models/User");
const authenticated = require('../../controllers/authenticated');



router.get("/", authenticated, async (req, res) => {
  let total = User.find({referredBy: req.user._id}).count();
  let completed = User.find({referredBy: req.user._id, kycVerified: true}).count();
  let pending = User.find({referredBy: req.user._id, kycVerified: false}).count();

  total = await total;
  completed = await completed;
  pending = await pending;

   res.send({
     total, completed, pending
   })
});


module.exports = router;
