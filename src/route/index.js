var express = require("express");
var router = express.Router();

// START DASHBOARD ===============================================
const { index_dashboard } = require("../controller/dashboard");
router.get("/", index_dashboard);
// END DASHBOARD ===============================================

// START CATEGORY ================================================
const { index_category } = require("../controller/category");
router.get("/category", index_category);
// END CATEGORY ================================================

module.exports = router;
