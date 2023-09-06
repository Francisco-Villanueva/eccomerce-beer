//CART MODELS
const S = require("sequelize");
const db = require("../db");

class Cart extends S.Model {}

Cart.init(
  {
    count: {
      type: S.INTEGER,
      allowNull: false,
    },
    amount: {
      type: S.INTEGER,
      allowNull: false,
    },
    cartBuyId: {
      type: S.INTEGER,
      allowNull: true,
    },
  },
  { sequelize: db, modelName: "cart" }
);

module.exports = Cart;
