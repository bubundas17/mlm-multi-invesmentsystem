let mongoose = require('mongoose');
const config = require("../config");

let Schema = mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: 1},
  amount: {type: Number},
  spins: [{type: Number}],
  status: {type: String, default: config.consts.PACKAGE_STATUS_PENDING},
  completedSpins: [{type: Boolean}],
  created: {type: Date, default: Date.now()},
  startDate: {type: Date},
  endDate: {type: Date, default: Date.now()},
});

// TorrentSchema.index({title: 'text'}, { default_language: "none" });
module.exports = mongoose.model('Investment', Schema);
