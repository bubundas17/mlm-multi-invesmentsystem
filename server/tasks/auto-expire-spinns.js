const Investments = require("../models/Investments");
const CronJob = require('cron').CronJob;
const config = require("../config")
// Per Hour
const job = new CronJob('0 * * * *', async function () {
  await Investments.update({
    status: config.consts.PACKAGE_STATUS_ACTIVE,
    endDate: {$lte: Date.now()}
  }, {$set: {status: config.consts.PACKAGE_STATUS_EXPIRED}}, {multi: true})
}, null, true, 'America/Los_Angeles');
