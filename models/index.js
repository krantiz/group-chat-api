"use strict";

const fs = require("fs");
const path = require("path");
const DataTypes = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const db = {};

let sequelize;

const db_connection_config = {
  username: process.env.MYSQL_DB_USERNAME,
  password: process.env.MYSQL_DB_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
  host: process.env.MYSQL_DB_HOST,
  dialect: "mysql",
};
sequelize = new DataTypes(
  process.env.MYSQL_DB_NAME,
  process.env.MYSQL_DB_USERNAME,
  process.env.MYSQL_DB_PASSWORD,
  db_connection_config
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      DataTypes.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.DataTypes = DataTypes;

module.exports = db;

// const dbConfig = require("../config/db.config.js");

// const DataTypes = require("sequelize");
// const sequelize = new DataTypes(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//   host: dbConfig.HOST,
//   dialect: dbConfig.dialect,
//   operatorsAliases: false,

//   pool: {
//     max: dbConfig.pool.max,
//     min: dbConfig.pool.min,
//     acquire: dbConfig.pool.acquire,
//     idle: dbConfig.pool.idle
//   }
// });

// const db = {};

// db.DataTypes = DataTypes;
// db.sequelize = sequelize;

// db.tutorials = require("./tutorial.model.js")(sequelize, DataTypes);
// db.users = require("./user.model.js")(sequelize, DataTypes);
// db.userRoleMapping = require("./userRoleMapping.model.js")(sequelize, DataTypes);
// db.role = require("./role.model.js")(sequelize, DataTypes);
// db.schoolBasicDetail = require("./schoolBasicDetail.model.js")(sequelize, DataTypes);
// db.schoolRating = require("./schoolRating.model.js")(sequelize, DataTypes);

// module.exports = db;
