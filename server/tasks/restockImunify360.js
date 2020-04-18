let LicenseKeys = require("../models/LicenseKeys");
let config = require("../config");
const axios = require("axios")
const faker = require('faker');
const CronJob = require('cron').CronJob;
const bunyan = require('bunyan');
const log = bunyan.createLogger({name: "RestockImunify360"});

// {
//   key: '111666-CLN-0d73ccbd68bf1b5085922b40b23b7b20',
//     customer: {
//   password: 'czEA167F',
//     id: '204187',
//     login: 'amanda_metz@gmail.com'
// }
// }


const job = new CronJob('*/10 * * * *', async function() {
  let count = await LicenseKeys.find(
    { licType: config.consts.LIC_KEY_TYPES_IMUNI,
      status: config.consts.LIC_KEY_ACTIVE,
      expires: {$gte: Date.now()}
    }).count();
  // log.info("IMUNIFY360 Stock: " + count);
  if(count < 5) {
    log.info("License About to out of stock! Restocking!");

    log.info("GETTING IMUNIFY360 LIC");
    RegisterTrial().then( async lic => {

      let expDate = new Date(); // Now
      expDate.setDate(expDate.getDate() + 30); // 30 Day Trial!

      await LicenseKeys.create({
        licenseKey: lic.key,
        expires: expDate,
        licType: config.consts.LIC_KEY_TYPES_IMUNI,
        extras: lic.customer
      });
      log.info("IMUNIFY360 LIC ADDED!");
    }).catch(err=> {
      log.warn("ERROR GETTING IMUNIFY360 LIC", err);
    })
  }

}, null, true, 'America/Los_Angeles');

job.start();


function solveCaptcha() {
  return new Promise(((resolve, reject) => {
    let timeout = false;

    setTimeout(() => {
      timeout = true;
      reject("TIMEOUT")
    }, 60000);


    axios.get("https://2captcha.com/in.php", {
      params: {
        key: config.towcapchaApiKey,
        method: "userrecaptcha",
        googlekey: "6LeXyRgUAAAAABPLPA7HaB09QvhCmRqTGre8RUKn",
        pageurl: "https://www.imunify360.com/trial",
        json: 1
      }
    }).then(async data => {
      while (true) {
        if(timeout) break;

        await new Promise(resolve2 => setTimeout(() => {
          resolve2()
        }, 6000));

        try {
          let res = await axios.get("https://2captcha.com/res.php", {
            params: {
              key: config.towcapchaApiKey,
              action: "get",
              id: data.data.request,
              json: 1
            }
          });
          if (res.data.status) {
            resolve(res.data.request);
            break;
          }
          // console.log("Not Ready!")
        } catch (e) {
          // reject(e);
          // break
        }
      }
    })
      .catch(err => reject(err))
  }))
}


function RegisterTrial() {
  return new Promise((resolve, reject) => {
    solveCaptcha()
      .then(capcha => {
        return axios({
          method: 'POST',
          url: 'https://cln.cloudlinux.com/wapi/trial/reg/',
          timeout: 2*60*1000,
          params: {
            productCode: "IM_UN",
            pageId: 6,
            "g-recaptcha-response": capcha
          },
          data: {
            email: faker.internet.email(),
            firstName: faker.name.findName(),
            lastName: faker.name.firstName(),
            company: faker.company.companyName(),
            countryCode:  faker.address.countryCode(),
            consentGiven: "on",
            "g-recaptcha-response": capcha
          }
        })
      })
      .then(data => {
        resolve(data.data)
      })
      .catch(err => {
        reject(err)
      })
  });
}
