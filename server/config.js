require('dotenv').config();
const configEditable = require("./config-editable.json")
module.exports = {
  siteUrl: "https://amplecoin.in",
  db: {
    uri: process.env.MONGO_DB_URI || 'mongodb://localhost/ampplecoin'
  },
  jwtSecret: process.env.JWT_SECRET || "loasjdjhgwbvhmcxzbjszjkb3dsa633sad56as446dsa6sa46fsad4sa6fdsa",
  sessionSecret: process.env.SESSION_SECRET || "464asd65sa65d4s46asd46dsa65dsa44dsa 4dsa6sad4",
  towcapchaApiKey: process.env.TOW_CAPTHA_API_KEY || "",
  newUserBonus: 0,
  referralBonus: 0,
  webServer: {
    host: process.env.HOST || "0.0.0.0",
    port: process.env.PORT || 3001
  },
  // Lavel as follows: Lavel 1, lavel 2, lavel 3 ... lavel 10
  MLM_PERCENTAGES: [7, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5],
  WEEL_NUMBERS: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  TOTAL_WHEEL_SUM: 140,
  MLM_MAXREFER_EARNING_MULTIPLAYER: 5,

  mail: {
    from: "\"The Truth Club\" <noreply@thetruthclub.in>",
    pass: "#9GmkSEaq64C",
    SMTPUsername: "noreply@thetruthclub.in",
    SMTPHost: "pro.fastest-server.com",
    SMTPPort: 587
  },
  byebye_sms: {
    senderID: "TRUCLB",
    apiKey: "26039593C11AEC",
    routeid: 7
  },
  razorpay: {
    key: "rzp_test_KJcjoHIWEsmVBD",
    key_secret: "8FXuj5unhhd2NKdSckfQ8IVL"
  },
  consts: {
    OTP_STATUS_VALID: "VALID",
    OTP_STATUS_USED: "USED",
    VOUCHER_ACTIVE: "ACTIVE",
    VOUCHER_BLACKLISTED: "BLACKLISTED",
    VOUCHER_USED: "USED",
    VOUCHER_EXPIRED: "EXPIRED",
    INVOICE_TYPE_CREDIT: "CREDIT",
    INVOICE_TYPE_DEBIT: "DEBIT",
    PACKAGE_STATUS_ACTIVE: "ACTIVE",
    PACKAGE_STATUS_PENDING: "PENDING",
    PACKAGE_STATUS_EXPIRED: "EXPIRED",
    // PACKAGE_STATUS_ACTIVE: "ACTIVE",
    LICENSE_STATUS_ACTIVE: "ACTIVE",
    LICENSE_STATUS_SUSPENDED: "SUSPENDED",
    LICENSE_STATUS_CANCELLED: "CANCELLED",
    LICENSE_STATUS_EXPIRED: "EXPIRED",
    LICENSE_STATUS_PAUSED: "PAUSED",
    LIC_KEY_ACTIVE: "ACTIVE",
    LIC_KEY_USED: "USED",
    LIC_KEY_TYPES_CLN: "CLN",
    LIC_KEY_TYPES_IMUNI: "IMUNI",
    // Withdrawal Status
    WITHDRAWAL_STATUS_PROCESSING: "PROCESSING",
    WITHDRAWAL_STATUS_COMPLETED: "COMPLETED",
    WITHDRAWAL_STATUS_FAILED: "FAILED",
    WITHDRAWAL_STATUS_CANCELLED: "CANCELLED",

  },
  resellers: {
    banner: ``,
    email: "",
    copyright: "",
    hostName: ""
  },
  ...configEditable
};
