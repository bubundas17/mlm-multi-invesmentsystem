let mongoose = require('mongoose');
const config = require("../config");

let Schema = mongoose.Schema({
  code: {type: String, required: true},
  amount: {type: Number, required: true, default: 0},
  created: {type: Date, default: Date.now()},
  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  used: {type: Date},
  usedBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  status: {type: String, default: config.consts.VOUCHER_ACTIVE} // ACTIVE, USED, BLACKLISTED
});

// TorrentSchema.index({title: 'text'}, { default_language: "none" });
module.exports = mongoose.model('Voucher', Schema);
