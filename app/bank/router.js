const express = require("express");
const router = express.Router();
const multer = require("multer");
const os = require("os");

const { isLogin } = require("../../src/middleware/auth");
router.use(isLogin);

const { indexBank, viewCreateBank, actionCreateBank, viewEditBank, actionEditBank, actionDeleteBank } = require("./controller");
router.get("/bank", indexBank)
router.get("/bank/create", viewCreateBank)
router.post("/bank/create", actionCreateBank)
router.get("/bank/edit/:id", viewEditBank);
router.put("/bank/edit/:id", actionEditBank);
router.delete("/bank/delete/:id", actionDeleteBank);

module.exports = router