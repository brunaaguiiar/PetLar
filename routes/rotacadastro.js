const express = require("express");
const router = express.Router();
const db = require("../db");

// rota para cadastrar novo usuário
router.post("/", async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ error: "Preencha todos os campos!" });
  }

  try {
    // criptografa a senha antes de salvar
    const hashedPassword = await bcrypt.hash(senha, 10);

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
