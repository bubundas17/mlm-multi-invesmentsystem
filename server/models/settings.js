let mongoose = require('mongoose');
const config = require("../config");

let Schema = mongoose.Schema({
  popup: {
    enabled: {type: Boolean, default: false},
    text: {type: String, default: ""}
  },
  promotion: {
    bonus: {type: String, default: ""},
    future: {type: String, default: ""}
  },
  zodiac: {
    aries: {type: String, default: ""},
    taurus: {type: String, default: ""},
    gemini: {type: String, default: ""},
    cancer: {type: String, default: ""},
    leo: {type: String, default: ""},
    virgo: {type: String, default: ""},
    libra: {type: String, default: ""},
    scorpio: {type: String, default: ""},
    sagittarius: {type: String, default: ""},
    capricorn: {type: String, default: ""},
    aquarius: {type: String, default: ""},
    pisces: {type: String, default: ""},
  }
});

// TorrentSchema.index({title: 'text'}, { default_language: "none" });
module.exports = mongoose.model('Settings', Schema);
