const express = require("express");
const { getCategories } = require("./services");
const router = express.Router();

router.get("/", getCategories);

module.exports = router;
