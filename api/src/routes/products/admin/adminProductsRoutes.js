const express = require("express");
const router = express.Router();

const { editBook, createBook, deleteBook } = require("./services");

router.delete("/", deleteBook);
router.post("/", createBook);
router.put("/", editBook);

module.exports = router;
