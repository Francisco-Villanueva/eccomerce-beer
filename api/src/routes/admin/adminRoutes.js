const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  switchAdmin,
  deleteUser,
  getUserById,
  newCategory,
  destoryCategory,
} = require("./services");

router.get("/users", getAllUsers);
router.get("/users/:userId", getUserById);
router.put("/users/:userId/admin", switchAdmin);
router.delete("/users/:userId", deleteUser);

router.post("/category", newCategory);
router.delete("/category/:category", destoryCategory);

module.exports = router;
