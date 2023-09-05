//USERS MODELS
const S = require("sequelize");
const db = require("../db");

class User extends S.Model {
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
    }
  },
  { sequelize: db, modelName: "user" }
);

module.exports = User;