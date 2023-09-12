const {
  getAllBooks,
  getBookById,
} = require("../../../repositories/google_books_API/booksApi_eccomerce");

const getAllProducts = async (req, res) => {
  try {
    const books = await getAllBooks();

    res.status(200).json(books);
  } catch (error) {
    console.log(error);
    res.status(401).json({ error });
  }
  ``;
};

const getProductById = async (req, res) => {
  try {
    const { product_id } = req.params;

    const book = await getBookById(product_id);

    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(401).send({ error });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
};
