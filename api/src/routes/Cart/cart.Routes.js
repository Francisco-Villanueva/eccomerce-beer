//ROUTES FOR CART
const express = require("express");
const router = express.Router();
const cartServices = require("./services");

router.post("/add/:bookId/:userId", cartServices.add);
router.delete("/remove/:bookId/:userId", cartServices.remove);
router.put("/edit/:bookId/:userId", cartServices.editAmount);

module.exports = router;