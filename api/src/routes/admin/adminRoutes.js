const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  makeAdmin,
  deleteUser,
  getUserById,
} = require("./services");

router.get("/users", getAllUsers);
router.get("/users/:userId", getUserById);
router.put("/users/:userId", makeAdmin);
router.delete("/users/:userId", deleteUser);

module.exports = router;
