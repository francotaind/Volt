require('dotenv').config(); // Load environment variables
const mysql = require('mysql2');
const fs = require('fs');

// Create the MySQL connection using the environment variables
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: true,  // Enforce SSL connection
    ca: fs.readFileSync(process.env.DB_SSL_CA)  // Path to the CA certificate
  }
});

// Connect to the MySQL database
connection.connect(error => {
  if (error) {
    console.error('Error connecting to the database:', error);
    return;
  }
  console.log('Successfully connected to the database');
});

module.exports = connection;

