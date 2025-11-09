// arquivo de conecxão com o banco de dados (modulo)

const mysql = require("mysql2");

//criar a conecxão
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "122707",
  database: "petlar",
});

//estabelecer a conecxão
db.connect((err) => {
  if (err) throw err;
  console.log("Conectado ao banco de dados MySQL!");
});

//exportar o modulo
module.exports = db;
