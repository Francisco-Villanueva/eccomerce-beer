// cree el router el que une todas las rutas
const express = require("express");
const router = express.Router();
const cartRouter = require("./Cart/cart.Routes");
const userRoutes = require("./user/userRotes");
const adminRoutes = require("./admin/adminRoutes");

const userProductsRoutes = require("./products/user/productsRoutes");
const adminProductsRoutes = require("./products/admin/adminProductsRoutes");

router.get("/test", (req, res) => {
  res.send("anda el server");
});

router.use("/cart", cartRouter);
router.use("/user", userRoutes);
router.use("/admin", adminRoutes);

router.use("/admin/products", adminProductsRoutes);

router.use("/user/products", userProductsRoutes);

module.exports = router;
