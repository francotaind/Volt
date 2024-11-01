const mysql = require('mysql2');

// Create the MySQL connection using your provided credentials
const connection = mysql.createConnection({
  host: 'mysql-2fb9d0c4-francotaind00-7296.g.aivencloud.com',
  user: 'avnadmin',
  password: 'AVNS_yL1i_Pji1Qcv-GNNpws',  // Use the password you provided
  database: 'message_board',
  port: 11395,  // Specify the port
  ssl: {
    rejectUnauthorized: true,  // Enforce SSL connection
    ca: require('fs').readFileSync(__dirname + '/ca-cert.pem')  // Path to the CA certificate
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

