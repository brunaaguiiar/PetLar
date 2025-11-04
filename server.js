// arquivo principal do servidor
const express = require("express");
const app = express();
const port = 3000;
const path = require("path"); //pegar o caminho dos arquivos estaticos

//informar onde os arquivos estao

app.use(express.static("public")); //pasta raiz dos arquivos estaticos

//chamar o modulo de conecxão com o banco de dados
const db = require("./db");

//api - rotas do sistema
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,"public", "src", "home", "index.html"));
});

//importar o modulo de rotas
const apiRoutes = require("./routes/api"); //puxa as rotas da api

app.use(express.json()); //habilitar o uso do json no express

app.use("/api/users/", apiRoutes); //alcançar as rotas da api (api.js)

//vincular o servidor na porta
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
