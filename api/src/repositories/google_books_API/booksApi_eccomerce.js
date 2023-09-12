const axios = require("axios");
const { prices } = require("./prices.json");
require("dotenv").config();
// const { API_KEY } = process.env;
const API_KEY = "AIzaSyCgieI78zpbDkojepkBnUMOlbrjFgKhjCs";
const getAllBooks = async () => {
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
        // console.log({ index: prices_index, prices: prices[prices_index] });
      }
      if (prices[prices_index]) {
        allBooks[i].price = prices[prices_index].price;
      }
    }

    const response = allBooks.map((m) => ({
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

    return response;
  } catch (error) {
    console.log(error);
    res.status(401).json({ error });
  }
};

const getBookById = async (product_id) => {
  try {
    const book = await axios.get(
      `https://www.googleapis.com/books/v1/volumes/${product_id}`
    );
    const prices_index = prices.findIndex((e) => e.idBook === book.data.id);

    if (prices[prices_index]) {
      book.data.price = prices[prices_index].price;
    }

    const response = {
      bookId: book.data.id,
      title: book.data.volumeInfo.title,
      price: book.data.price,
      date: book.data.volumeInfo.publishedDate,
      categories: book.data.volumeInfo.categories,
      rating: book.data.volumeInfo.averageRating,
      image: book.data.volumeInfo.imageLinks
        ? book.data.volumeInfo.imageLinks.thumbnail
        : "https://libribook.com/images/manual-forensic-taphonomy-2nd-edition-pdf.jpg",
      lenguage: book.data.volumeInfo.lenguage,
      description: book.data.volumeInfo.description,
    };

    return response;
  } catch (error) {
    console.log("NO ANDA EL GET BY ID");
  }
};

module.exports = {
  getAllBooks,
  getBookById,
};
