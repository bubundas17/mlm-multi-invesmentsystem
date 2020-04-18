let mongoose = require('mongoose');
const config  = require("../config");

let Schema = mongoose.Schema({
  title: {type: String, required: true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  date: {type: Date, default: Date.now()},
  description: {type: String},
  finalAmount: {type: Number, required: true},
  // items: [
  //   {name: String, amount: Number}
  // ],
  txnType: {type: String, required: true, default: config.consts.INVOICE_TYPE_DEBIT}, // CREDIT, DEBIT
  // status: {type: String, required: true}
});

// TorrentSchema.index({title: 'text'}, { default_language: "none" });
module.exports = mongoose.model('Invoice', Schema);
