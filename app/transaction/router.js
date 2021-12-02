const express = require("express");
const router = express.Router();
const multer = require("multer");
const os = require("os");

const { isLogin } = require("../../src/middleware/auth");
router.use(isLogin);

const { index_Transaction, actionStatusTransaction, viewDetailTransaction } = require("./controller");
router.get("/transaction", index_Transaction);
router.put("/transaction/status/:id", actionStatusTransaction);
router.get("/transaction/detail/:id", viewDetailTransaction);

module.exports = router