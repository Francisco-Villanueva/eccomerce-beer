//RELATIONS
const User = require("./User");
const Book = require("./Book");
const Cart = require("./Cart");
const Cart_buy = require("./Cart_Buy");
const Category = require("./Category");

User.hasMany(Cart_buy, { as: "user_cartBuy" });
User.hasMany(Cart, { as: "user_cart" });

Cart.hasMany(Cart_buy, { as: "cart_cartBuy" });

module.exports = { User, Book, Cart, Cart_buy, Category };
