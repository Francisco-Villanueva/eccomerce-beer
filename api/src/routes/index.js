// cree el router el que une todas las rutas
const express = require("express");
const router = express.Router();
const cartRouter = require("./Cart/cart.Routes");
const userRoutes = require("./user/userRotes.js");
const userProductsRoutes = require("./products/user/productsRoutes");
const adminProductsRoutes = require("./products/admin/adminProductsRoutes");
const adminRoutes = require("./admin/adminRoutes");
const categoiresRoutes = require("./categories/categoiresRoutes");
const { enviarCorreo } = require("../repositories/mailer/mailer");

router.use("/admin", adminRoutes);
router.use("/cart", cartRouter);
router.use("/user", userRoutes);
router.use("/user/products", userProductsRoutes);
router.use("/admin/books", adminProductsRoutes);

router.use("/category", categoiresRoutes);

router.post("/mail", (req, res) => {
  const mail = `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f0f0f0;
          padding: 20px;
        }
        .container {
          width: 80%;
          margin: 0 auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #333;
        }
        p {
          color: #555;
        }
        .total {
          font-weight: bold;
          font-size: 1.2em;
          color: #FF5733;
        }
        .books {
          margin-left: 20px;
        }
        .book {
          margin-bottom: 10px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Tu compra fue realizada con éxito</h1>
        <p class="total">TOTAL: $ 1000</p>
        <p>Cantidad de libros: $1</p>
        <div class="books">
          <p>Libros comprados:</p>
          <ul>
            libro
          </ul>
        </div>
      </div>
    </body>
  </html>
`;

  // Resto del código para enviar el correo...

  enviarCorreo(mail, "franciscovillanuevaj99@gmail.com");

  res.send("mail enviado");
});

module.exports = router;
