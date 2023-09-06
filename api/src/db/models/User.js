//USERS MODELS
const S = require("sequelize");
const { hash, genSaltSync } = require("bcrypt");

const db = require("../db");

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
    },
    salt: {
      type: S.STRING,
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

module.exports = User;
