require('dotenv').config();
module.exports = {
  siteUrl: "https://test.amplecoin.in",
  db: {
    uri: process.env.MONGO_DB_URI || 'mongodb://localhost/ampplecoin'
  },
  jwtSecret: process.env.JWT_SECRET || "JKLSDHAKL:HJDLKJASHDLHLKAWSHJDLKSA",
  sessionSecret: process.env.SESSION_SECRET || "SADHILAUHDLKAHLD",
  towcapchaApiKey: process.env.TOW_CAPTHA_API_KEY || "29d316dc7f783dd00452e24a40ed4c04",
  newUserBonus: 25,
  referralBonus: 25,
  webServer: {
    host: process.env.HOST || "0.0.0.0",
    port: process.env.PORT || 3001
  },
  mail: {
    from: "\"Team DigiBazaar\" admin@digibazaar.net",
    pass: "Sj8dp9nFjt0[",
    SMTPUsername: "admin@digibazaar.net",
    SMTPHost: "mail.digibazaar.net",
    SMTPPort: 465

  },
  consts: {
    VOUCHER_ACTIVE: "ACTIVE",
    VOUCHER_BLACKLISTED: "BLACKLISTED",
    VOUCHER_USED: "USED",
    VOUCHER_EXPIRED: "EXPIRED",
    INVOICE_TYPE_CREDIT: "CREDIT",
    INVOICE_TYPE_DEBIT: "DEBIT",
    LICENSE_STATUS_ACTIVE: "ACTIVE",
    LICENSE_STATUS_SUSPENDED: "SUSPENDED",
    LICENSE_STATUS_CANCELLED: "CANCELLED",
    LICENSE_STATUS_EXPIRED: "EXPIRED",
    LICENSE_STATUS_PAUSED: "PAUSED",
    LIC_KEY_ACTIVE: "ACTIVE",
    LIC_KEY_USED: "USED",
    LIC_KEY_TYPES_CLN: "CLN",
    LIC_KEY_TYPES_IMUNI: "IMUNI",

  },
  resellers: {
    banner: `
  ___   _   _____   _____ ___  _  _ ___ ___ ___
 | __| /_\\ / __\\ \\ / / __/ _ \\| \\| | __|_ _/ __|
 | _| / _ \\\\__ \\\\ V / (_| (_) | .\` | _| | | (_ |
 |___/_/ \\_\\___/ |_| \\___\\___/|_|\\_|_| |___\\___|
`,
    email: "support@easyconfig.net",
    copyright: "Project EasyConfig © 2020",
    hostName: "data.easyconfig.net"
  }
};
