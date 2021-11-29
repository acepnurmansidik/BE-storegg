var express = require("express");
var router = express.Router();

// START DASHBOARD ===============================================
const { index_dashboard } = require("../controller/dashboard");
router.get("/", index_dashboard);
// END DASHBOARD ===============================================

// START CATEGORY ================================================
const { index_category, view_create, actionCreate } = require("../controller/category");
router.get("/category", index_category);
router.get("/category/create", view_create);
router.post("/category/create", actionCreate);
// END CATEGORY ================================================

module.exports = router;
