var express = require("express");
const { index } = require("../controller");
var router = express.Router();

router.get("/", index);

module.exports = router;
