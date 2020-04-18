let mongoose = require('mongoose');

let Schema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: 1
  },
  filename: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean, default: false
  },
  pending: {
    type: Boolean, default: true
  },
  declined: {
    type: Boolean, default: false
  }

});

// TorrentSchema.index({title: 'text'}, { default_language: "none" });
module.exports = mongoose.model('kyc', Schema);
