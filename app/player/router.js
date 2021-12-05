const express = require("express");
const { landingPage, categoryPage, detailPage, historyPage, checkoutPage, historyDetailPage } = require("./controller");
const router = express.Router();
const {playerAuthorization}=require("../../src/middleware/auth")

router.get("/landingpage", landingPage);
router.get("/:id/detail", detailPage);
router.get("/category", categoryPage);
router.post("/checkout",playerAuthorization, checkoutPage);
router.get("/history", playerAuthorization, historyPage);
router.get("/history/:id/detail", playerAuthorization, historyDetailPage);

module.exports = router;
