//ROUTES FOR CART
const express = require("express");
const router = express.Router();
const cartServices = require("./cartServices");

router.post("/add/:bookId", cartServices.add);

module.exports = router;