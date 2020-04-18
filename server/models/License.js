let mongoose = require('mongoose');
const config = require("../config");

let Schema = mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: 1},
  created: {type: Date, default: Date.now(), index: 1},
  expires: {type: Date, index: 1},
  serverIP: {type: String, index: 1},
  renewCycle: {type: Number, default: 30},
  domainName: {type: String},
  autoRenew: {type: Boolean, default: false},
  licenseType: {type: mongoose.Schema.Types.ObjectId, ref: "LicenseType", required: true, index: 1},
  licenseSlug: {type: String, required: true, index: 1},
  amount: {type: Number, required: true},
  status: {type: String, default: config.consts.LICENSE_STATUS_ACTIVE, index: 1}, // ACTIVE, SUSPENDED, CANCELLED
  extras: {}
});

// TorrentSchema.index({title: 'text'}, { default_language: "none" });
module.exports = mongoose.model('License', Schema);
