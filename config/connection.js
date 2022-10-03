const mysql = require('mysql2');

require('dotenv').config();

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL Username
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    // TODO: Add MySQL Password
    database: 'team_db'
  },
  console.log(`Connected to the team_db database.`)
);

module.exports = db;
