const express = require("express");
const router = express.Router();

const { isLogin } = require("../../src/middleware/auth");
router.use(isLogin);

const { indexNominal, viewCreateNominal, actionCreateNominal, viewEditNominal, actionEditNominal, actionDeleteNominal } = require("./controller");
router.get("/nominal", indexNominal)
router.get("/nominal/create", viewCreateNominal);
router.post("/nominal/create", actionCreateNominal);
router.get("/nominal/edit/:id", viewEditNominal);
router.put("/nominal/edit/:id", actionEditNominal);
router.delete("/nominal/delete/:id", actionDeleteNominal);

module.exports = router