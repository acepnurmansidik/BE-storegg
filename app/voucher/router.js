const express = require("express");
const router = express.Router();
const multer = require("multer");
const os = require("os");

const { isLogin } = require("../../src/middleware/auth");
router.use(isLogin);

const { indexVoucher, viewCreateVoucher, actionCreateVoucher, viewEditVoucher, actionEditVoucher, actionDeleteVoucher, actionStatus } = require("./controller");
router.get("/voucher", indexVoucher)
router.get("/voucher/create", viewCreateVoucher)
router.post("/voucher/create", multer({dest: os.tmpdir()}).single('image'), actionCreateVoucher)
router.get("/voucher/edit/:id", viewEditVoucher)
router.put("/voucher/edit/:id", multer({ dest: os.tmpdir() }).single("image"), actionEditVoucher);
router.delete("/voucher/delete/:id", actionDeleteVoucher)
router.put("/voucher/status/:id", actionStatus)

module.exports = router