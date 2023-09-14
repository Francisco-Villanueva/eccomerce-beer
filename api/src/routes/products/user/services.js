const {
  getAllBooks,
  getBookById,
} = require("../../../repositories/google_books_API/booksApi_eccomerce");
const { getBooksFromDb, getBookById_DB } = require("../../../utils/BooksDb");
const getAllProducts = async (req, res) => {
  try {
    const books = await getAllBooks();
    const books_db = await getBooksFromDb();

    const allBooks = books_db.concat(books);
    res.status(200).json(allBooks);
  } catch (error) {
    console.log(error);
    res.status(401).json({ error });
  }
  ``;
};

const getProductById = async (req, res) => {
  try {
    const { product_id } = req.params;

    // let book;
    if (isNaN(product_id)) {
      // entonces es de la API

      const book = await getBookById(product_id);
      return res.status(200).json(book);
    } else {
      const book = await getBookById_DB(product_id);

      return res.status(200).json(book);
    }

    // res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(401).send({ error });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
};
