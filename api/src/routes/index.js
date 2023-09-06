// cree el router el que une todas las rutas
const express = require("express");
const router = express.Router();
const userRoutes = require("./user/userRotes");

router.use("/user", userRoutes);

module.exports = router;
