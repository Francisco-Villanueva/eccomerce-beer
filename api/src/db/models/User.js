//USERS MODELS
const S = require("sequelize");
const { hash, genSaltSync } = require("bcrypt");

const db = require("../db");
const { Cart, Cart_buy } = require("../models/index");

class User extends S.Model {
  async validatePassword(loginPw) {
    // console.log(this.email, " // ", this.password, "//  pw login: ", loginPw);
    try {
      const hashRes = await hash(loginPw, this.salt);
      return hashRes === this.password;
    } catch (err) {
      return console.log("se rompe el validate: ", err);
    }
  }
}

User.init(
  {
    username: {
      type: S.STRING,
      allowNull: false,
    },
    email: {
      type: S.STRING,
      allowNull: false,
    },
    password: {
      type: S.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: S.BOOLEAN,
      defaultValue: false,
    },
    salt: {
      type: S.STRING,
    },
    currentCart: {
      type: S.STRING,
      allowNull: true,
    },
  },
  { sequelize: db, modelName: "user" }
);

User.beforeCreate((user) => {
  const salt = genSaltSync(8);
  user.salt = salt;

  return hash(user.password, user.salt)
    .then((hash) => {
      user.password = hash;
    })
    .catch((e) => console.log(e));
});

User.prototype.getInfo = async function (id) {
  return User.findOne({
    where: { id },
    include: {
      model: Cart,
      as: "user_cart",
      include: {
        model: Cart_buy,
        as: "cart_cartBuy",
      },
    },
  });
};
module.exports = User;
