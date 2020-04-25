const nodemailer = require("nodemailer");
const config = require("./config");

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

transporter.verify(function(error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});


// send mail with defined transport object
transporter.sendMail({
  from: config.mail.from, // sender address
  to: "bubundas17@gmail.com", // list of receivers
  subject: "Test Mail", // Subject line
  text: "This is just a test mail. No no need to worry", // plain text body
  html: "<b>This is just a test mail. No no need to worry</b>" // html body
}).then( info => {
  console.log(info)
})

// console.log("Message sent: %s", info.messageId);
