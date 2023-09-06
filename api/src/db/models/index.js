//RELATIONS
const User = require("./User");
const Book = require("./Book");
const Cart = require("./Cart");
const Cart_buy = require("./Cart_Buy");


Cart.belongsTo(User, { foreignKey: "cartId" });
Cart.hasMany(Cart_buy, { foreignKey: "cartId" });
Book.belongsTo(Cart_buy, { foreignKey: "bookId" });
// User.hasOne(Cart, { foreignKey: "cartId" });
// Cart_buy.belongsTo(Cart, { foreignKey: "cartId" });
// Cart_buy.belongsTo(Book, { foreignKey: "bookId" });

module.exports = {User, Book, Cart, Cart_buy};