// cree el router el que une todas las rutas
const express = require("express");
const router = express.Router();
const userRoutes = require("./user/userRotes");
const userProductsRoutes = require("./products/user/productsRoutes");

router.use("/user", userRoutes);
router.use("/user/products", userProductsRoutes);

module.exports = router;
