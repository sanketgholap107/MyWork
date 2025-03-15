const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST, // Generally, 'localhost' or the server's IP address
    port: process.env.DB_PORT, // Default port for MSSQL
    dialect: process.env.DB_DIALECT,
    logging: false, // Disable logging; default: console.log
  }
);

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the MSSQL database has been established successfully."
    );
  })
  .catch((err) => {
    console.error("Unable to connect to the MSSQL database:", err);
  });

// Export the Sequelize instance to be used in other modules
module.exports = sequelize;
