const { Sequelize } = require("sequelize");

// Nos conectamos a la base de datos.
const sequelize = new Sequelize("libraryadmin", "root", "1234", {
  host: "localhost",
  dialect: "mysql",
  logging: false
})

const db = {}

// Agregar sequelize al objeto db
db.sequelize = sequelize;

// Exporto objeto db con la conexion de sequelize
// usado para definir modelos.
module.exports = db;
