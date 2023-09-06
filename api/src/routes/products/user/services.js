const axios = require("axios");

require("dotenv").config();
const { API_KEY } = process.env;
const getAllProducts = async (req, res) => {
  try {
    const products1 = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=programacion&key=${API_KEY}&maxResults=40`
    );
    const products2 = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=programacion&key=${API_KEY}&startIndex=40&maxResults=40`
    );

    const allBooks = products1.data.items.concat(products2.data.items);
    console.log({ products: allBooks.length });

    res.status(200).json(allBooks);
  } catch (error) {
    console.log(error);
    res.status(401).send({ error });
  }
};

const getProductById = async (req, res) => {
  try {
    const { product_id } = req.params;

    const book = await axios.get(
      `https://www.googleapis.com/books/v1/volumes/${product_id}`
    );

    res.status(200).json(book.data);
  } catch (error) {
    console.log(error);
    res.status(401).send({ error });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
};
