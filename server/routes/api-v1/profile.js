const express = require('express');
const router = express.Router();
const User = require("../../models/User");
const authenticated = require('../../controllers/authenticated');
const config = require("../../config");
const validator = require("validator");
const jwt = require("jsonwebtoken");

router.get("/", authenticated, async (req, res) => {
  let user = await User.findById(req.user._id);
  res.json({user: user.safeData})
});


router.get("/verify", async (req, res) => {
  // console.log(fs.readSync("../../templates/email/EmailVerification.ejs"));
  let token = req.query.token;

  try {
    let user = jwt.verify(token, config.jwtSecret);
    if (!user.username) throw new Error("Invalid Token");
    if (user.action !== "verifyEmail") throw new Error("Invalid Token");
    await User.findOneAndUpdate({username: user.username}, {
      $set: {
        emailVerified: true
      }
    });
    res.send(`
        <h1>Email Verification Completed!</h1>
        <p>Redirecting you in 5 sec...</p>
       <script>
         setTimeout(function(){
            window.location.href = '/';
         }, 5000);
      </script>
    `);
  } catch (err) {
    res.send(`
        <h1>Email Verification Failed! Please resend the verification link</h1>
        <p>Redirecting you in 5 sec...</p>
       <script>
         setTimeout(function(){
            window.location.href = '/';
         }, 5000);
      </script>
    `);
  }
});


router.post("/", authenticated, (req, res) => {
  let name = req.body.name;
  let email = req.body.email;


});


router.get("/branding", authenticated, async (req, res) => {
  let user = await User.findById(req.user._id);
  // let { discount, level, banner, email, copyright, hostName } = user.safeData.reseller;
  let branding = {...config.resellers, ...user.safeData.reseller};
  res.json({branding: branding})
});

router.post("/branding", authenticated, async (req, res) => {
  let hostnameRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
  // let user =  await User.findById(req.user._id);
  let {banner, email, copyright, hostName} = req.body;
  if (!banner) return res.status(400).send({error: 1, message: "Banner Cannot Be Empty!"});
  if (!email || !validator.isEmail(email)) return res.status(400).send({
    error: 1,
    message: "Please Enter correct Email."
  });
  if (!copyright) return res.status(400).send({error: 1, message: "Copyright Cannot Be Empty!"});
  if (!hostName || !hostnameRegex.test(hostName)) return res.status(400).send({
    error: 1,
    message: "Copyright Cannot Be Empty!"
  });
  let user = await User.findByIdAndUpdate(req.user._id, {
    $set: {
      "reseller.banner": banner,
      "reseller.email": email,
      "reseller.copyright": copyright,
      "reseller.hostName": hostName
    }
  }, {new: true})
  res.json({user: user.reseller})
});


module.exports = router;
