const axios = require("axios");
const { prices } = require("./prices.json");
require("dotenv").config();
// const { API_KEY } = process.env;
const API_KEY = "AIzaSyCgieI78zpbDkojepkBnUMOlbrjFgKhjCs";
const getAllProducts = async (req, res) => {
  try {
    const products1 = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=programacion&key=${API_KEY}&maxResults=40`
    );
    const products2 = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=programacion&key=${API_KEY}&startIndex=40&maxResults=40`
    );
    const allBooks = products1.data.items.concat(products2.data.items);

    for (let i = 0; i < allBooks.length; i++) {
      const prices_index = prices.findIndex((e) => e.idBook === allBooks[i].id);
      if (i < 1) {
        console.log({ index: prices_index, prices: prices[prices_index] });
      }
      if (prices[prices_index]) {
        allBooks[i].price = prices[prices_index].price;
      }
    }
    res.status(200).json(allBooks);
  } catch (error) {
    console.log(error);
    res.status(401).json({ error });
  }
};

const getProductById = async (req, res) => {
  try {
    const { product_id } = req.params;

    const book = await axios.get(
      `https://www.googleapis.com/books/v1/volumes/${product_id}`
    );
    const prices_index = prices.findIndex((e) => e.idBook === book.data.id);

    if (prices[prices_index]) {
      book.data.price = prices[prices_index].price;
    }
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
