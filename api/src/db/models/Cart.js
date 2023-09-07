//CART MODELS
const S = require("sequelize");
const db = require("../db");

class Cart extends S.Model {}

Cart.init(
  {
    price: {
      type: S.INTEGER,
      allowNull: true,
    },
  },
  { sequelize: db, modelName: "cart" }
);

module.exports = Cart;
