const express = require("express");
const router = express.Router();

const { getAllUsers, makeAdmin, deleteUser } = require("./services");
router.get("/users", getAllUsers);
router.get("/users/:userId", getAllUsers);
router.put("/users/:userId", makeAdmin);
router.delete("/users/:userId", deleteUser);

module.exports = router;
