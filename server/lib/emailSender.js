const nodemailer = require("nodemailer");
const config = require("../config");

let transporter = nodemailer.createTransport({
  host: config.mail.SMTPHost,
  port: config.mail.SMTPPort,
  // secure: true, // use TLS
  auth: {
    user: config.mail.SMTPUsername,
    pass: config.mail.pass
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
  }
});


// send mail with defined transport object
// transporter.sendMail({
//   from: config.mail.from, // sender address
//   to: "bubundas17@gmail.com", // list of receivers
//   subject: "Test Mail", // Subject line
//   text: "This is just a test mail. No no need to worry", // plain text body
//   html: "<b>This is just a test mail. No no need to worry</b>" // html body
// }).then( info => {
//   console.log(info)
// });

module.exports = (obj = {}) => {
  let defaults = {
    from: config.mail.from
  };
  return transporter.sendMail({...obj, ...defaults});
};
