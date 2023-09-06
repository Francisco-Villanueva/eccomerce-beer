// cree el router el que une todas las rutas
const express = require("express");
const router = express.Router();

const { getAllProducts, getProductById } = require("./services");
router.get("/", getAllProducts);
router.get("/:product_id", getProductById);

module.exports = router;
