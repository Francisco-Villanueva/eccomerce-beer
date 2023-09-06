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
  } catch (error) {
    console.log({ error });
    res.status(401).send(error);
  }
};
const deleteBook = async (req, res) => {
  try {
  } catch (error) {
    console.log({ error });
    res.status(401).send(error);
  }
};

module.exports = {
  createBook,
  editBook,
  deleteBook,
};
