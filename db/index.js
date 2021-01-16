const mysql = require("mysql2");

module.exports = {
  createDBConnection: () => {
    return mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "test-covid",
    });
  },
};
