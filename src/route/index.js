var express = require("express");
var router = express.Router();

// START DASHBOARD ===============================================
const { index_dashboard } = require("../controller/dashboard");
router.get("/", index_dashboard);
// END DASHBOARD ===============================================

// START CATEGORY ================================================
const { actionCreate, viewCreate, indexCategory, viewEdit, actionEdit, actionDelete } = require("../controller/category");
router.get("/category", indexCategory);
router.get("/category/create", viewCreate);
router.post("/category/create", actionCreate);
router.get("/category/edit/:id", viewEdit);
router.put("/category/edit/:id", actionEdit);
router.delete("/category/delete/:id", actionDelete);
// END CATEGORY ================================================

module.exports = router;
