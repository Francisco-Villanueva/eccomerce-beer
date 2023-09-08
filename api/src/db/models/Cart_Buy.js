//CART_BUY MODELS
const S = require("sequelize");
const db = require("../db");

class Cart_buy extends S.Model {}

Cart_buy.init(
  {
    bookId: {
      type: S.STRING,
      allowNull: true,
    },
    count: {
      type: S.INTEGER,
      defaultValue: 1,
      allowNull: true,
    },
  },
  { sequelize: db, modelName: "cart_buy" }
);

module.exports = Cart_buy;
