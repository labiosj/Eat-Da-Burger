// Set up MySQL connection.
const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_Host,
  port: process.env.PORT,
  user: process.env.DB_User,
  password: process.env.DB_PASS,
  database: process.env.DB
});

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;
