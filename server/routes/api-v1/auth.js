const express = require('express');
const validator = require("validator");
const router = express.Router();
const User = require("../../models/User");
const config = require("../../config");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const authenticated = require('../../controllers/authenticated');
const sessionAuth = require('../../controllers/SessionAuth');
const ejs = require("ejs");
const emailSender = require("../../lib/emailSender");
const util = require("../../lib/util");
const Otp = require("../../models/Otp")


router.post("/signup", async (req, res) => {
  let {username, email, name, password, phone, refer, state, dob, aadhaar} = req.body;
  if (!username) return res.status(400).json({message: "Please Enter Username"});
  if (!email && !validator.isEmail(email)) return res.status(400).json({message: "Please Enter A Valid Email"});
  if (!name) return res.status(400).json({message: "Please Enter Name"});
  if (!password) return res.status(400).json({message: "Please Enter Password"});
  if (!phone) return res.status(400).json({message: "Please Enter Phone Number"});
  if (!state) return res.status(400).json({message: "Please Enter State"});
  if (!dob) return res.status(400).json({message: "Please Enter Dob"});
  if (!aadhaar) return res.status(400).json({message: "Please Enter Aadhaar Number"});
  if(await User.findOne({phone: phone})) return res.status(400).json({message: "Mobile Number Already Registered"});
  if(await User.findOne({aadhaar: aadhaar})) return res.status(400).json({message: "Aadhaar Number Already Registered"});
  if(await User.findOne({username: username})) return res.status(400).json({message: "Username Already Taken"});


  let referUser = null;

  if (refer) {
    referUser = await User.findOne({username: refer});
  }

  if (refer && !referUser) return res.status(400).json({message: "Invalid Referral Code"});

  try {
    let hashedpass = bcrypt.hashSync(password, 10);
    let uptree = [];
    if (referUser && referUser.uptree) {
      uptree = referUser.uptree;
      uptree.unshift(referUser._id)
      uptree.slice(config.MLM_PERCENTAGES.length, uptree.length)
    }

    let userData = await User.create({
      username, name, email, password: hashedpass, phone, state, dob, aadhaar, referredBy: referUser, uptree
    });

    let token = jwt.sign({
        id: userData._id,
        username: userData.username,
        name: userData.name,
        email: userData.email,
        admin: userData.admin,
      },
      config.jwtSecret, {expiresIn: '10m'});

    let emailVerifyToken = jwt.sign({username: userData.username, action: "verifyEmail"},
      config.jwtSecret, {expiresIn: '30day'});

    ejs.renderFile(__dirname + "/../../templates/email/EmailVerification.ejs", {
      token: emailVerifyToken,
      siteUrl: config.siteUrl
    }, async (err, str) => {
      await emailSender({
        subject: "Email Verification Link",
        to: userData.email,
        html: str
      })
    });
    util.sendSMS(phone, `Hi, ${name}\n Welcome to The Truth Club.\n Your registration is now completed.\n\n Login Data:\nUsername: ${username}\nPassword: ${password}`)

    res.json({
      message: "User SignUp Completed!",
      user: {
        id: userData._id,
        username: userData.username,
        name: userData.name,
        email: userData.email,
        admin: userData.admin
      },
      token: token
    })
  } catch (err) {
    console.log(err);
    res.status(400).json({message: "Unknown Error"});
  }
});


router.post("/resend-verify-email", async (req, res) => {
  let emailVerifyToken = jwt.sign({username: req.user.username, action: "verifyEmail"},
    config.jwtSecret, {expiresIn: '30day'});

  ejs.renderFile(__dirname + "/../../templates/email/EmailVerification.ejs", {
    token: emailVerifyToken,
    siteUrl: config.siteUrl
  }, async (err, str) => {
    await emailSender({
      subject: "Email Verification Link",
      to: req.user.email,
      html: str
    })
  });

  res.send({message: "OK"})

});

router.get("/get-access-token", sessionAuth, (req, res) => {
  let token = jwt.sign({
      _id: req.user._id,
      username: req.user.username,
      name: req.user.name,
      email: req.user.email,
      admin: req.user.admin
    },
    config.jwtSecret, {expiresIn: '10m'});

  // Renew Session and extend the expiration time.
  req.session.touch();
  res.json({
    message: "Access Token generated from session",
    user: {
      _id: req.user._id,
      username: req.user.username,
      name: req.user.name,
      email: req.user.email,
      admin: req.user.admin
    },
    token: token
  })
});

router.get("/refresh-token", authenticated, (req, res) => {
  let token = jwt.sign({
      _id: req.user._id,
      username: req.user.username,
      name: req.user.name,
      email: req.user.email,
      admin: req.user.admin
    },
    config.jwtSecret, {expiresIn: '10m'});

  // Renew Session and extend the expiration time.
  // req.session.touch();
  res.json({
    message: "Access Token Refreshed.",
    user: {
      _id: req.user._id,
      username: req.user.username,
      name: req.user.name,
      email: req.user.email,
      admin: req.user.admin
    },
    token: token
  })
});

router.post("/login", async (req, res) => {
  let {username, password} = req.body;
  let userData = await User.findOne({username});
  if (userData && bcrypt.compareSync(String(password), userData.password)) {
    let token = jwt.sign({
        _id: userData._id,
        username: userData.username,
        name: userData.name,
        email: userData.email,
        admin: userData.admin
      },
      config.jwtSecret, {expiresIn: '10m'});

    req.session.userId = String(userData._id);
    req.session.hash = userData.password;
    req.session.username = userData.username;
    res.send({
      message: "User Logged In!",
      user: {
        _id: userData._id,
        username: userData.username,
        name: userData.name,
        email: userData.email,
        admin: userData.admin
      },
      token: token
    })

  } else {
    res.status(401).send({message: "Unauthorized"})
  }
});

router.post("/forgot-pass", async (req, res) => {
  let username = req.body.username;
  try {
    let user = await User.findOne({username: username})
    if (!user) return res.status(404).send({message: "User Not Found."})
    let OTP = util.randomInt(10000, 99999)
    await Otp.create({
      user: user._id,
      otp: OTP + "",
    })
    await util.sendSMS(user.phone, `Hi, ${user.username}\n ${OTP} is your OTP for password reset.`)
    ejs.renderFile(__dirname + "/../../templates/email/OTP.ejs", {
      otp: OTP,
      title: "OTP for Password Reset"
    }, async (err, str) => {
      await emailSender({
        subject: "OTP For Password Reset",
        to: user.email,
        html: str
      })
    });
    res.send({message: "OTP sent to email and phone"})
  } catch (e) {
    console.log(e)
    return res.status(404).send({message: "User Not Found."})
  }
})

router.post("/reset", async (req, res) => {
  let username = req.body.username;
  let otp = req.body.otp;
  otp = otp + ""
  otp = otp.trim();
  let newpass = req.body.newpass;
  let hashedpass = bcrypt.hashSync(newpass, 10);
  try {
    let user = await User.findOne({username: username})
    let otpgot = await Otp.findOne({user: user._id, status: config.consts.OTP_STATUS_VALID, otp: otp})
    if (otpgot) {
      // OTP validated
      await Otp.remove({user: user._id})
      await User.findByIdAndUpdate(user._id, {$set: {password: hashedpass}})
      return res.send({message: "Password Updated"})
    }
    return res.status(401).send({message: "Invalid OTP or User Not Found."})
  } catch (e) {
    console.log(e)
    return res.status(401).send({message: "Invalid OTP or User Not Found."})
  }

})


router.get("/logout", (req, res) => {
  req.session.destroy();
  res.send({
    message: "Success"
  })
})

module.exports = router;
