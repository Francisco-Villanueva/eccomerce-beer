// cree el router el que une todas las rutas
const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  res.send("anda el server");
});

module.exports = router;
