const express = require('express');
const router = express.Router();
const apiV1 = require("./api-v1/");
// const licSysV1 = require("./licsys-v1");
// const PubApiV1 = require("./pubapi-v1");

const extractUser = require("../controllers/extractUser");
const apiUser = require("../controllers/apiExtractUser");

router.use("/api/v1", extractUser);
router.use("/pubapi/v1", apiUser);

router.use("/api/v1", apiV1);
// router.use("/licsys/v1", licSysV1);
// router.use("/pubapi/v1", PubApiV1);

module.exports =  router;
