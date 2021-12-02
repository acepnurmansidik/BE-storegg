const express = require("express");
const router = express.Router();
const multer = require("multer");
const os = require("os");

const { isLogin } = require("../../src/middleware/auth");
router.use(isLogin);

const { index_dashboard } = require("./controller");
router.get("/dashboard", index_dashboard);

module.exports = router;