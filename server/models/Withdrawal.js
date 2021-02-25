let mongoose = require('mongoose');
const config = require("../config");

let Schema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: 1
  },
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  refunded: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    default: config.consts.WITHDRAWAL_STATUS_PROCESSING
    // required: true
  }

});

// TorrentSchema.index({title: 'text'}, { default_language: "none" });
module.exports = mongoose.model('withdrawal', Schema);
