const {
  getAllBooks,
  getBookById,
} = require("../../../repositories/google_books_API/booksApi_eccomerce");

const getAllProducts = async (req, res) => {
  try {
    const books = await getAllBooks();

    const response = books.map((m) => ({
      bookId: m.id,
      title: m.volumeInfo.title,
      price: m.price,
      date: m.volumeInfo.publishedDate,
      categories: m.volumeInfo.categories,
      rating: m.volumeInfo.averageRating,
      image: m.volumeInfo.imageLinks
        ? m.volumeInfo.imageLinks.thumbnail
        : "https://libribook.com/images/manual-forensic-taphonomy-2nd-edition-pdf.jpg",
      lenguage: m.volumeInfo.lenguage,
      description: m.volumeInfo.description,
    }));

    res.status(200).json(response);
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

    const response = {
      bookId: book.id,
      title: book.volumeInfo.title,
      price: book.price,
      date: book.volumeInfo.publishedDate,
      categories: book.volumeInfo.categories,
      rating: book.volumeInfo.averageRating,
      image: book.volumeInfo.imageLinks
        ? book.volumeInfo.imageLinks.thumbnail
        : "https://libribook.com/images/manual-forensic-taphonomy-2nd-edition-pdf.jpg",
      lenguage: book.volumeInfo.lenguage,
      description: book.volumeInfo.description,
    };
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(401).send({ error });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
};
