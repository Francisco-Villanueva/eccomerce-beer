// cree el router el que une todas las rutas
const express = require("express");
const router = express.Router();
const cartRouter = require("./Cart/cart.Routes");
const userRoutes = require("./user/userRotes.js");
const userProductsRoutes = require("./products/user/productsRoutes");
const adminRoutes = require("./admin/adminRoutes");
const { enviarCorreo } = require("../repositories/mailer/mailer");
router.use("/admin", adminRoutes);
router.use("/cart", cartRouter);
router.use("/user", userRoutes);
router.use("/user/products", userProductsRoutes);

// router.post("/mail", (req, res) => {
//   const { mail, msg } = req.body;

//   enviarCorreo(msg, mail);

//   res.status(200).send("mail enviado");
// });
module.exports = router;
