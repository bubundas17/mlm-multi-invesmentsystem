let lib = require("./lib/util");

// console.log(!lib.isSunday(new Date()))
(async () => {
  await lib.sendSMS("7001533982", "Test SMS FROM API")
})()
