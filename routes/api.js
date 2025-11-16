//importar o express
const express = require('express');

//middleware
const router = express.Router();

//trazer a conecxão com o banco de dados
const db = require('../db');    

//criar rotas 
router.post("/", async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: "Preencha todos os campos!" });
  }

  try {
   const query = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";
    db.query(query, [nome, email, hashedPassword], (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ error: "E-mail já cadastrado!" });
        }
        console.error("Erro ao cadastrar usuário:", err);
        return res.status(500).json({ error: "Erro no servidor!" });
      }

      res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao processar o cadastro" });
  }
});


 module.exports = router;