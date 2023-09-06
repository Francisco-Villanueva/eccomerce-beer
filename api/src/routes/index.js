// cree el router el que une todas las rutas
const express = require("express");
const router = express.Router();
const cartRouter = require("./Cart/cart.Routes");
const userRoutes = require("./user/userRotes");
const userProductsRoutes = require("./products/user/productsRoutes");

router.get("/test", (req, res) => {
  res.send("anda el server");
});

router.use("/cart", cartRouter);
router.use("/user", userRoutes);
router.use("/user/products", userProductsRoutes);


module.exports = router;
