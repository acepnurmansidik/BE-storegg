const express = require("express");
const router = express.Router();
const multer = require("multer")
const os = require("os")

// START PLAYERS [API] =====================================================
const URL = `/api/v1/players`;
const { landingPage, detailPage } = require("../controller/player");
router.get(`${URL}/landingpage`, landingPage);
router.get(`${URL}/:id/detail`, detailPage);
// END PLAYERS [API] =======================================================

// START USERS =====================================================
const { viewSignIn, actionSignin, actionSignout, indexPlayer, viewDetailPlayer } = require("../controller/user");
router.get("/", viewSignIn)
router.post("/", actionSignin)
router.get("/signout", actionSignout);
// END USERS =======================================================

// START MIDDLEWARE ================================================
const { isLogin } = require("../middleware/auth");
router.use(isLogin)
// END MIDDLEWARE ==================================================

// START DASHBOARD =================================================
const { index_dashboard } = require("../controller/dashboard");
router.get("/dashboard", index_dashboard);
// END DASHBOARD ===================================================

// START CATEGORY ==================================================
const { actionCreate, viewCreate, indexCategory, viewEdit, actionEdit, actionDelete } = require("../controller/category");
router.get("/category", indexCategory);
router.get("/category/create", viewCreate);
router.post("/category/create", actionCreate);
router.get("/category/edit/:id", viewEdit);
router.put("/category/edit/:id", actionEdit);
router.delete("/category/delete/:id", actionDelete);
// END CATEGORY ====================================================

// START NOMINAL ===================================================
const { indexNominal, viewCreateNominal, actionCreateNominal, viewEditNominal, actionEditNominal, actionDeleteNominal } = require("../controller/nominal");
router.get("/nominal", indexNominal)
router.get("/nominal/create", viewCreateNominal);
router.post("/nominal/create", actionCreateNominal);
router.get("/nominal/edit/:id", viewEditNominal);
router.put("/nominal/edit/:id", actionEditNominal);
router.delete("/nominal/delete/:id", actionDeleteNominal);
// END NOMINAL =======================================================

// START VOUCHER =====================================================
const { indexVoucher, viewCreateVoucher, actionCreateVoucher, viewEditVoucher, actionEditVoucher, actionDeleteVoucher, actionStatus } = require("../controller/voucher");
router.get("/voucher", indexVoucher)
router.get("/voucher/create", viewCreateVoucher)
router.post("/voucher/create", multer({dest: os.tmpdir()}).single('image'), actionCreateVoucher)
router.get("/voucher/edit/:id", viewEditVoucher)
router.put("/voucher/edit/:id", multer({ dest: os.tmpdir() }).single("image"), actionEditVoucher);
router.delete("/voucher/delete/:id", actionDeleteVoucher)
router.put("/voucher/status/:id", actionStatus)
// END VOUCHER =======================================================

// START BANK ========================================================
const { indexBank, viewCreateBank, actionCreateBank, viewEditBank, actionEditBank, actionDeleteBank } = require("../controller/bank");
router.get("/bank", indexBank)
router.get("/bank/create", viewCreateBank)
router.post("/bank/create", actionCreateBank)
router.get("/bank/edit/:id", viewEditBank);
router.put("/bank/edit/:id", actionEditBank);
router.delete("/bank/delete/:id", actionDeleteBank);
// END BANK ==========================================================

// START PAYMENT =====================================================
const { indexPayment, viewCreatePayment, actionCreatePayment, viewEditPayment, actionEditPayment, actionDeletePayment, actionStatusPayment } = require("../controller/payment");
router.get("/payment", indexPayment)
router.get("/payment/create", viewCreatePayment)
router.post("/payment/create", actionCreatePayment)
router.get("/payment/edit/:id", viewEditPayment)
router.put("/payment/edit/:id", actionEditPayment)
router.delete("/payment/delete/:id", actionDeletePayment);
router.put("/payment/status/:id", actionStatusPayment);
// END PAYMENT =======================================================

// START TRANSACTION =================================================
const { index_Transaction, actionStatusTransaction, viewDetailTransaction } = require("../controller/transaction");
router.get("/transaction", index_Transaction);
router.put("/transaction/status/:id", actionStatusTransaction);
router.get("/transaction/detail/:id", viewDetailTransaction);
// END TRANSACTION ===================================================

// START PLAYER ================================================
router.get("/player", indexPlayer);
router.get("/player/detail/:id", viewDetailPlayer);
// END PLAYER ==================================================
module.exports = router;
