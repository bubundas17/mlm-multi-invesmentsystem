const express = require('express');
const router = express.Router();
const adminonly = require("../../controllers/adminOnly")
const path = require("path")
const fs = require("fs")
const SettingsDB = require("../../models/settings")
const {exec} = require('child_process');

router.get("/", adminonly, async (req, res) => {
  res.sendFile(path.join(__dirname, "../../config-editable.json"))
})

router.post("/", adminonly, async (req, res) => {
  let data = req.body
  fs.writeFileSync(path.join(__dirname, "../../config-editable.json"), JSON.stringify(data, null, 2))
  res.send({message: "OK"})
  try {
    await exec('pm2 restart all');
  } catch (e) {
  }
  // res.sendFile(path.join(__dirname, "../../config-editable.json"))
})

router.get("/other", async (req, res) => {
  let settings = await SettingsDB.findOne({});
  if (settings) {
    return res.send(settings)
  }
  res.send({
    popup: {
      enabled: false,
      text: ""
    },
    promotion: {
      bonus: "",
      future: ""
    },
    zodiac: {
      aries: "",
      taurus: "",
      gemini: "",
      cancer: "",
      leo: "",
      virgo: "",
      libra: "",
      scorpio: "",
      sagittarius: "",
      capricorn: "",
      aquarius: "",
      pisces: "",
    }
  })
})
router.post("/other", async (req, res) => {
  let settings = req.body;
  await SettingsDB.findOneAndUpdate({}, settings, {upsert: true});
  res.send({message: "OK"})
})

module.exports = router;
