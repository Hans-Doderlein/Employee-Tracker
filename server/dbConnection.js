// Import and require mysql2
const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection({
  host: "localhost",

  user: "root",

  password: "root",
  database: "restaurant_db",
});

module.exports = db;
