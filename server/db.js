const mysql = require('mysql');
const { promisify } = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'new_project',
});

connection.promise = promisify(connection.query);
module.exports = connection;
