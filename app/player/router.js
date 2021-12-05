const express = require("express");
const { landingPage, categoryPage, detailPage, checkoutPage } = require("./controller");
const router = express.Router();
const {playerAuthorization}=require("../../src/middleware/auth")

router.get("/landingpage", landingPage);
router.get("/:id/detail", detailPage);
router.get("/category", categoryPage);
router.post("/checkout",playerAuthorization, checkoutPage);

module.exports = router;
