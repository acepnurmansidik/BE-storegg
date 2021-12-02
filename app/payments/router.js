const express = require("express");
const router = express.Router();

const { isLogin } = require("../../src/middleware/auth");
router.use(isLogin);

const { indexPayment, viewCreatePayment, actionCreatePayment, viewEditPayment, actionEditPayment, actionDeletePayment, actionStatusPayment } = require("./controller");
router.get("/payment", indexPayment)
router.get("/payment/create", viewCreatePayment)
router.post("/payment/create", actionCreatePayment)
router.get("/payment/edit/:id", viewEditPayment)
router.put("/payment/edit/:id", actionEditPayment)
router.delete("/payment/delete/:id", actionDeletePayment);
router.put("/payment/status/:id", actionStatusPayment);

module.exports = router