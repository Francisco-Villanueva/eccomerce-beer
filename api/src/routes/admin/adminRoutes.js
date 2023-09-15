const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  makeAdmin,
  deleteUser,
  getUserById,
  newCategory,
  destoryCategory,
} = require("./services");

router.get("/users", getAllUsers);
router.get("/users/:userId", getUserById);
router.put("/users/:userId", makeAdmin);
router.delete("/users/:userId", deleteUser);

router.post("/category", newCategory);
router.delete("/category/:categoryId", destoryCategory);

module.exports = router;
