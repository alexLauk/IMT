const mysql = require("mysql2");

module.exports = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "myapp",
  password: "AlexR@@m78"
});
