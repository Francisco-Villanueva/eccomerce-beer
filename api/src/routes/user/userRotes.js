// cree el router el que une todas las rutas
const express = require("express");
const router = express.Router();
const { register, login, me, secret, logout, editProfile } = require("./services");
const { validateUser } = require("../../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/secret", secret);
router.put("/profile/:userId", editProfile);
router.get("/me", validateUser, me);

module.exports = router;
