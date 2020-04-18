const Licenses = require("../models/License");
const CronJob = require('cron').CronJob;
const config =  require("../config");
const Invoice = require("../models/Invoice");
const User    = require("../models/User");

const job = new CronJob('0 0 * * *', async function() {
  licExpire()
  licRenew()
}, null, true, 'America/Los_Angeles');

job.start();


async function licExpire() {
  await Licenses.updateMany(
    {
      expires:{ $lte: Date.now() },
      status: config.consts.LICENSE_STATUS_ACTIVE,
      autoRenew: false
    },
    {
      $set: { status: config.consts.LICENSE_STATUS_EXPIRED }
    }
  )
}

async function licRenew() {
  let licenses = await Licenses.find({
    expires:{ $lte: Date.now() },
    status: config.consts.LICENSE_STATUS_ACTIVE,
    autoRenew: true
  });


  for(let lic of licenses){

    let license  = Licenses.findById(lic._id).populate("licenseType");

    let user = User.findById(lic.user);
    license = await license;
    user = await user;
    if(!license) continue;
    if(!user) continue;

    let origenalCost = Number(license.amount);

    let finalCost = origenalCost;

    let items = [];

    if(user.isReseller) {
      finalCost = calculateCost(user.reseller.discount, origenalCost);
      items = [...items, {name: `Reseller Discount`, amount: - Number(license.amount - finalCost).toFixed(2) }]
    }

    if(Number(user.balance) < Number(finalCost) ) {
      license.status = config.consts.LICENSE_STATUS_EXPIRED;
      license.save();
      continue;
    }

    items = [{name: `Renewal of ${license.licenseType.name} (${license.serverIP})`, amount: license.amount}, ...items];

    let expDate = new Date(); // Now

    if (license.status === config.consts.LICENSE_STATUS_EXPIRED) {
      expDate = new Date(); // Now
    } else {
      expDate = new Date(license.expires); // Now
    }

    expDate.setDate(expDate.getDate() + 30); // Set now + 30 days as the new date

    try {
      await Invoice.create({
        title: `Renewal of ${license.licenseType.name} (${license.serverIP}) Success!`,
        description: `Renewal of ${license.licenseType.name} (${license.serverIP}) Success!`,
        txnType: config.consts.INVOICE_TYPE_DEBIT,
        user: lic.user,
        finalAmount: finalCost,
        items: items
      });

      await User.findByIdAndUpdate(lic.user, {$inc:{balance: - Number(finalCost)}});
      await Licenses.findByIdAndUpdate(license._id, {$set: {expires: expDate}});
    } catch (e) {
      console.error(e);
    }
  }
}

function calculateCost(discount, cost){
  return Number(cost - ( (cost * discount)/100)).toFixed(2)
}
