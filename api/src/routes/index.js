// cree el router el que une todas las rutas
const express = require("express");
const router = express.Router();
const cartRouter = require("./Cart/cart.Routes");
const userRoutes = require("./user/userRotes.js");
const userProductsRoutes = require("./products/user/productsRoutes");
const adminRoutes = require("./admin/adminRoutes");

router.use("/admin", adminRoutes);
router.use("/cart", cartRouter);
router.use("/user", userRoutes);
router.use("/user/products", userProductsRoutes);

module.exports = router;
