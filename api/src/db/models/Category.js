//CART MODELS
const S = require("sequelize");
const db = require("../db");

class Category extends S.Model {}

Category.init(
  {
    category: {
      type: S.STRING,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "category" }
);

module.exports = Category;
