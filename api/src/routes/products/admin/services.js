const { Cart, Book } = require("../../../db/models");

const createBook = async (req, res) => {
  try {
    const { title, description, author } = req.body;

    const newBook = await Book.create({ title, description, author });

    res.status(201).json({ msg: "Book created!", Book: newBook });
  } catch (error) {
    console.log({ error });
    res.status(401).send(error);
  }
};
const editBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const bookToEdit = await Book.findByPk(bookId);
    if (!bookToEdit) {
      return res.status(401).send(`Book not found! \n id: ${bookId}`);
    }
    const { title, description, author } = req.body;

    await bookToEdit.update({ title, description, author });

    res.status(201).json({ msg: "Book updated!", Book: bookToEdit });
  } catch (error) {
    console.log({ error });
    res.status(401).send(error);
  }
};
const deleteBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const bookToDelete = await Book.findByPk(bookId);
    if (!bookToDelete) {
      return res.status(401).send(`Book not found! \n id: ${bookId}`);
    }

    await bookToDelete.destroy();

    res.status(201).json({ msg: "Book deleted!", Book: bookToDelete });
  } catch (error) {
    console.log({ error });
    res.status(401).send(error);
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    res.status(401).send(error);
  }
};

const getBookById = async (req, res) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(401).send(`Book not found! \n id: ${bookId}`);
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(401).send(error);
  }
};
module.exports = {
  createBook,
  getAllBooks,
  editBook,
  deleteBook,
  getBookById,
};
