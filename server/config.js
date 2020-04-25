require('dotenv').config();
module.exports = {
  siteUrl: "https://amplecoin.in",
  db: {
    uri: process.env.MONGO_DB_URI || 'mongodb://localhost/ampplecoin'
  },
  jwtSecret: process.env.JWT_SECRET || "loasjdjhgwbvhmcxzbjszjkb3dsa633sad56as446dsa6sa46fsad4sa6fdsa",
  sessionSecret: process.env.SESSION_SECRET || "464asd65sa65d4s46asd46dsa65dsa44dsa 4dsa6sad4",
  towcapchaApiKey: process.env.TOW_CAPTHA_API_KEY || "",
  newUserBonus: 25,
  referralBonus: 25,
  webServer: {
    host: process.env.HOST || "0.0.0.0",
    port: process.env.PORT || 3001
  },
  mail: {
    from: "\"AmpleCoin\" <noreply@amplecoin.in>",
    pass: "X5Mb2DP!0NI5",
    SMTPUsername: "noreply@amplecoin.in",
    SMTPHost: "evo.fastest-server.com",
    SMTPPort: 587

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
    banner: ``,
    email: "",
    copyright: "",
    hostName: ""
  }
};
