//BOOKS MODELS
const S = require("sequelize");
const db = require("../db");

class Book extends S.Model {}

Book.init(
  {
    title: {
      type: S.STRING,
      allowNull: false,
    },
    description: {
      type: S.STRING,
      allowNull: true,
    },
    author: {
      type: S.STRING,
      allowNull: false,
    },
    price: {
      type: S.BOOLEAN,
    },
    img: {
      type: S.STRING,
      allowNull: true,
    },
    date: {
      type: S.DATE,
      allowNull: true,
    },
    pageCount: {
      type: S.INTEGER,
      allowNull: true,
    },
    publisher: {
      type: S.STRING,
      allowNull: true,
    },
    categories: {
      type: S.STRING,
      allowNull: true,
    },
    avergaRating: {
      type: S.FLOAT,
      allowNull: true,
    },
    language: {
      type: S.STRING,
      allowNull: true,
    },
  },
  { sequelize: db, modelName: "book" }
);

module.exports = Book;