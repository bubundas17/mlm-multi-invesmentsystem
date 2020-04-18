const express = require('express');
const router = express.Router();
const User = require("../../models/User");
const authenticated = require('../../controllers/authenticated');
const adminOnly = require('../../controllers/adminOnly');
const config = require("../../config");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.get("/", authenticated, adminOnly, async (req, res) => {
  let user = await User.find().lean();
  res.json({users: user})
});

router.get("/:id", authenticated, adminOnly, async (req, res) => {
  let userId = req.params.id;
  let user = await User.findById(userId);

  res.send({user})

});

router.post("/:id", authenticated, adminOnly, async (req, res) => {
  let userId = req.params.id;
  let {name, username, email, balance, kycVerified, emailVerified, banned, admin, phone} = req.body;

  let user = await User.findByIdAndUpdate(userId, {
      $set: {
        name,
        username,
        email,
        balance,
        kycVerified,
        emailVerified,
        admin,
        phone,
        banned
      }
    }, {new: true}
  );
  res.send({user})
});


router.post("/:id/setpass", authenticated, adminOnly, async (req, res) => {
  let userId = req.params.id;
  let {newpass} = req.body;
  let hashedpass = bcrypt.hashSync(newpass, 10);
  let user = await User.findByIdAndUpdate(userId, {
      $set: {
        password: hashedpass
      }
    }, {new: true}
  );
  res.send({user})
});

module.exports = router;
