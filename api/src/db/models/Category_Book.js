//CART MODELS
const S = require("sequelize");
const db = require("../db");

class Category_Book extends S.Model {}

Category_Book.init(
  {
    bookId: {
      type: S.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: S.INTEGER,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "category_book", timestamps: false }
);

module.exports = Category_Book;
