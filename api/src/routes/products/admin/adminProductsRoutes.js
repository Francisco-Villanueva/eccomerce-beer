const express = require("express");
const router = express.Router();

const {
  editBook,
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
} = require("./services");

router.get("/", getAllBooks);
router.get("/:bookId", getBookById);
router.delete("/:bookId", deleteBook);
router.post("/createBook", createBook);
router.put("/:bookId", editBook);

module.exports = router;
