const { Sequelize } = require("sequelize");

// // Create a new Sequelize instance for MSSQL


const sequelize = new Sequelize(
  "",
  "",
  ,
  "",
  {
    host: "103.120.176.21", // Generally, 'localhost' or the server's IP address
    port: 1433, // Default port for MSSQL
    dialect: "mssql",
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

