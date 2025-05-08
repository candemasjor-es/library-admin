const { DataTypes } = require("sequelize");
const db = require("../db");

const Member = db.sequelize.define(
  "Member",
  {
    name: {
      type: DataTypes.STRING,
    },
    registrationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {}
);

module.exports = Member;
