

const mysql = require("mysql2");


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "122707",
  database: "userdb_1",
});


db.connect((err) => {
  if (err) throw err;
  console.log("Conectado ao banco de dados MySQL!");
});


module.exports = db;
