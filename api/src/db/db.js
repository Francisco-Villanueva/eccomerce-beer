//DATABASE CONFIGURATION

const Sequelize = require("sequelize");

const db = new Sequelize("devbooks", null, null, {
  host: "localhost",
  dialect: "postgres",
  logging: false,
})

module.exports = db;