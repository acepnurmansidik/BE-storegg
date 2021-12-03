const express = require("express");
const { landingPage } = require("./controller");
const router = express.Router();

router.get("/landingpage", landingPage);
router.get("/:id/detail", landingPage);

module.exports = router;
