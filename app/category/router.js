const express = require("express");
const router = express.Router();

const { isLogin } = require("../../src/middleware/auth");
router.use(isLogin);

const { actionCreate, viewCreate, indexCategory, viewEdit, actionEdit, actionDelete } = require("./controller");
router.get("/category", indexCategory);
router.get("/category/create", viewCreate);
router.post("/category/create", actionCreate);
router.get("/category/edit/:id", viewEdit);
router.put("/category/edit/:id", actionEdit);
router.delete("/category/delete/:id", actionDelete);

module.exports = router