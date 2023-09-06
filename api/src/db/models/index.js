//RELATIONS
const User = require("./User");
const Book = require("./Book");
const Cart = require("./Cart");
const Cart_buy = require("./Cart_Buy");


User.hasOne(Cart, { foreignKey: "cartId" });
Cart.belongsTo(User, { foreignKey: "cartId" });
Cart.hasMany(Cart_buy, { foreignKey: "cartId" });
Cart_buy.belongsTo(Cart, { foreignKey: "cartId" });
Cart_buy.belongsTo(Book, { foreignKey: "bookId" });
Book.hasMany(Cart_buy, { foreignKey: "bookId" });

module.exports = {User, Book, Cart, Cart_buy};