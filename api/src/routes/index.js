// cree el router el que une todas las rutas
const express = require("express");
const router = express.Router();
const cartRouter = require("./Cart/cart.Routes");
const userRoutes = require("./user/userRotes.js");
const userProductsRoutes = require("./products/user/productsRoutes");
const adminProductsRoutes = require("./products/admin/adminProductsRoutes");
const adminRoutes = require("./admin/adminRoutes");
const categoiresRoutes = require("./categories/categoiresRoutes");

router.use("/admin", adminRoutes);
router.use("/cart", cartRouter);
router.use("/user", userRoutes);
router.use("/user/products", userProductsRoutes);
router.use("/admin/books", adminProductsRoutes);

router.use("/category", categoiresRoutes);

module.exports = router;
