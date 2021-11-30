var express = require("express");
var router = express.Router();

// START DASHBOARD ===============================================
const { index_dashboard } = require("../controller/dashboard");
router.get("/", index_dashboard);
// END DASHBOARD =================================================

// START CATEGORY ================================================
const { actionCreate, viewCreate, indexCategory, viewEdit, actionEdit, actionDelete } = require("../controller/category");
router.get("/category", indexCategory);
router.get("/category/create", viewCreate);
router.post("/category/create", actionCreate);
router.get("/category/edit/:id", viewEdit);
router.put("/category/edit/:id", actionEdit);
router.delete("/category/delete/:id", actionDelete);
// END CATEGORY =================================================

// START NOMINAL ================================================
const { indexNominal, viewCreateNominal, actionCreateNominal, viewEditNominal, actionEditNominal, actionDeleteNominal } = require("../controller/nominal");
router.get("/nominal", indexNominal)
router.get("/nominal/create", viewCreateNominal);
router.post("/nominal/create", actionCreateNominal);
router.get("/nominal/edit/:id", viewEditNominal);
router.put("/nominal/edit/:id", actionEditNominal);
router.delete("/nominal/delete/:id", actionDeleteNominal);
// END NOMINAL ==================================================

// START NOMINAL ================================================
// END NOMINAL ==================================================
module.exports = router;
