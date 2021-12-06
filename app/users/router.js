const express = require("express");
const router = express.Router();
const { viewSignIn, actionSignin, actionSignout, indexPlayer, viewDetailPlayer  } = require("./controller");

router.get("/", viewSignIn);
router.post("/", actionSignin);
router.get("/signout", actionSignout);

const { isLogin } = require("../../src/middleware/auth");
router.use(isLogin);

router.get("/player", indexPlayer);
router.get("/player/detail/:id", viewDetailPlayer)

module.exports = router;
