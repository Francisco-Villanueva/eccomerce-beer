// cree el router el que une todas las rutas
const express = require("express");
const router = express.Router();
const cartRouter = require("./Cart/cart.Routes");

router.get("/test", (req, res) => {
  res.send("anda el server");
});
router.use("/cart", cartRouter);
module.exports = router;
