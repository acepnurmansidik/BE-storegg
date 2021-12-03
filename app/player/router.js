const express = require("express");
const { landingPage, categoryPage, detailPage } = require("./controller");
const router = express.Router();

router.get("/landingpage", landingPage);
router.get("/:id/detail", detailPage);
router.get("/category", categoryPage);

module.exports = router;
