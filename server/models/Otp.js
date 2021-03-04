let mongoose = require('mongoose');
const config = require("../config");

let Schema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: 1
  },
  otp: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: config.consts.OTP_STATUS_VALID
    // required: true
  }

});

// TorrentSchema.index({title: 'text'}, { default_language: "none" });
module.exports = mongoose.model('Otp', Schema);
