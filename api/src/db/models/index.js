//RELATIONS
const User = require("./User");
const Book = require("./Book");
const Cart = require("./Cart");
const Cart_buy = require("./Cart_Buy");
const Category = require("./Category");
const Category_Book = require("./Category_Book");

User.hasMany(Cart_buy, { as: "user_cartBuy" });
User.hasMany(Cart, { as: "user_cart" });

Cart.hasMany(Cart_buy, { as: "cart_cartBuy" });

Book.hasMany(Category, { as: "book_category" });
Category.belongsToMany(Book, { through: "category_books" });

module.exports = { User, Book, Cart, Cart_buy, Category };
