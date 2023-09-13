//CART MODELS
const S = require("sequelize");
const db = require("../db");

class Cart extends S.Model {}

Cart.init(
  {
    price: {
      type: S.FLOAT,
      allowNull: true,
      defaultValue: 0,
    },
    date: {
      type: S.DATE,
      allowNull: true,
    },
    isOpen: {
      type: S.BOOLEAN,
      defaultValue: true,
    },
  },
  { sequelize: db, modelName: "cart" }
);

module.exports = Cart;
