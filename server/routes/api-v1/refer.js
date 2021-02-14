const express = require('express');
const router = express.Router();
const User = require("../../models/User");
const authenticated = require('../../controllers/authenticated');


router.get("/", authenticated, async (req, res) => {
  let total = User.find({uptree: req.user._id}).count();
  let completed = User.find({uptree: req.user._id, isActive: true}).count();
  let pending = User.find({uptree: req.user._id, isActive: {$ne: true}}).count();
  let users = User.find({uptree: req.user._id}).lean();

  total = await total;
  completed = await completed;
  pending = await pending;
  users = await users;
  users = users.map(data => {
    return {
      name: data.name,
      username: data.username,
      uptree: data.uptree,
      isActive: data.isActive
    }
  })
  res.send({
    total, completed, pending, users
  })
});


module.exports = router;
