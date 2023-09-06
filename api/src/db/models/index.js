//RELATIONS
const User = require("./User");
const Book = require("./Book");
const Cart = require("./Cart");
const Cart_buy = require("./Cart_Buy");

User.hasMany(Cart, { as: "user_cart" });
Cart.hasMany(Cart_buy, { as: "cartId" });
Book.belongsTo(Cart_buy, { as: "bookId" });
// User.hasOne(Cart, { foreignKey: "cartId" });
// Cart_buy.belongsTo(Cart, { foreignKey: "cartId" });
// Cart_buy.belongsTo(Book, { foreignKey: "bookId" });

module.exports = { User, Book, Cart, Cart_buy };
