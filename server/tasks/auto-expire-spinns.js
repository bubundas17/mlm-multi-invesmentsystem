const Licenses = require("../models/Investments");
const job = new CronJob('0 0 * * *', async function() {
  licExpire()
  licRenew()
}, null, true, 'America/Los_Angeles');
