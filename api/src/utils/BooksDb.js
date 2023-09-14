const { Book } = require("../db/models");

const getBooksFromDb = async () => {
  try {
    const books = await Book.findAll();

    return books;
  } catch (error) {
    console.log(error);
  }
};

const getBookById_DB = async (id) => {
  try {
    const book = await Book.findOne({ where: { id } });

    return book;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getBooksFromDb,
  getBookById_DB,
};
