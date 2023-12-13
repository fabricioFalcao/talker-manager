const mysql = require('mysql2/promise');

const mysqlConfig = {
  host: process.env.MYSQL_HOSTNAME || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'TalkerDB',
  port: process.env.MYSQL_PORT || 3306,
};

const connection = mysql.createPool(mysqlConfig);

module.exports = connection;
