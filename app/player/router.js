const express = require("express");
const { landingPage, categoryPage, detailPage, historyPage, checkoutPage, historyDetailPage, dashboard, profilePage, updateProfilePage } = require("./controller");
const router = express.Router();
const { playerAuthorization } = require("../../src/middleware/auth");
const multer = require("multer");
const os = require("os");

router.get("/landingpage", landingPage);
router.get("/:id/detail", detailPage);
router.get("/category", categoryPage);
router.post("/checkout",playerAuthorization, checkoutPage);
router.get("/history", playerAuthorization, historyPage);
router.get("/history/:id/detail", playerAuthorization, historyDetailPage);
router.get("/dashboard", playerAuthorization, dashboard);
router.get("/profile", playerAuthorization, profilePage);
router.put("/profile", playerAuthorization, multer({ dest: os.tmpdir() }).single("image"), updateProfilePage);

module.exports = router;
