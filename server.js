// arquivo principal do servidor
const express = require("express");
const app = express();
const port = 3000;
const path = require("path"); //pegar o caminho dos arquivos estaticos

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//informar onde os arquivos estao

app.use(express.static(path.join(__dirname, "public"))); //pasta raiz dos arquivos estaticos

//chamar o modulo de conecxão com o banco de dados
const db = require("./db");

//api - rotas do sistema
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "login.html"));
});

app.get("/cadastro", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "cadastro.html"));
});


//importar o modulo de rotas
const apiRoutes = require("./routes/api"); //puxa as rotas da api

app.use(express.json()); //habilitar o uso do json no express

app.use("/api/users/", apiRoutes); //alcançar as rotas da api (api.js)

const cadastroRoutes = require("./routes/rotacadastro");
app.use("/api/cadastro", cadastroRoutes);

//vincular o servidor na porta
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
