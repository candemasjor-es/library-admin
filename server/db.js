const { Sequelize } = require("sequelize");

//Nos conectamos a la base de datos.
const sequelize = new Sequelize("libraryadmin", "root", "1234", {
  host: "localhost",
  dialect: "mysql",
});

const db = {};

//Agregar sequelize el objeto db
db.sequelize = sequelize;

//Exporto objeto de
module.exports = db;
