let mongoose = require('mongoose');
let config = require("../config");
let Schema = mongoose.Schema({
  username: {type: String, unique: true, index: 1},
  email: {type: String, index: 1},
  name: {type: String},
  phone: {type: Number},
  password: {type: String, required: true},
  referredBy: {
    type: mongoose.Schema.Types.ObjectId, ref: "User", index: 1
  },

  admin: {type: Boolean, default: false},
  created: {type: Date, default: Date.now},
  balance: {type: Number, default: config.newUserBonus},
  emailVerified: {type: Boolean, default: false},
  kycVerified: {type: Boolean, default: false},
  banned: {type: Boolean, default: false},
});

// Safe Data, Which is safe to pass to end user.
Schema.virtual('safeData').get(function () {
  let data = this.toObject();
  data.password = undefined;
  // data.balance  = undefined;
  return data;
});


// TorrentSchema.index({title: 'text'}, { default_language: "none" });
module.exports = mongoose.model('User', Schema);
