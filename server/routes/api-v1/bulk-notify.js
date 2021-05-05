const express = require('express');
const router = express.Router();
const users = require("../../models/User")
const util = require("../../lib/util");
const emailSender = require("../../lib/emailSender");

router.get("/", async (req, res) => {
  let allusers =  await users.find().count()
  res.send({count: allusers});
})

router.post("/sms", async (req, res) => {
  let contents = req.body.content;
  if(!contents) return req.send({error: 1, message: "SMS Contents Could not be empty."})
  res.send({message: "SMS Started sending...."})
  let allusers =  await users.find()
  for(let u of allusers){
    await util.sendSMS(u.phone, contents)
  }

})

router.post("/email", async (req, res) => {
  let subject = req.body.subject;
  let contents = req.body.content;
  if(!contents) return req.send({error: 1, message: "Email Contents Could not be empty."})
  if(!subject) return req.send({error: 1, message: "Subject Could not be empty."})
  res.send({message: "SMS Started sending...."})
  let allusers =  await users.find()
  for(let u of allusers){
    await emailSender({
      subject: subject,
      to: u.email,
      html: contents
    })
  }
})

module.exports = router;
