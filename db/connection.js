const util = require('util');
const mysql2 = require('mysql2');

const connection = mysql2.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'mysqlpw666',
  database: 'employees'
});

connection.connect();

connection.query = util.promisify(connection.query);

module.exports = connection;