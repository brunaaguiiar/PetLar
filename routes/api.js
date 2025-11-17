// importar o express
const express = require('express');
const router = express.Router();

// conexão com o banco
const db = require('../db');

// ----------------------
// ROTA POST - Cadastrar
// ----------------------
router.post('/', (req, res) => {
    const { nome, email, senha } = req.body;

    db.query(
        'INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)',
        [nome, email, senha],
        (err, result) => {
            if (err) return res.status(500).json({ error: err });

            res.status(201).json({
                id: result.insertId,
                nome,
                email,
                senha
            });
        }
    );
});

// ----------------------
// ROTA POST - Login
// ----------------------
router.post("/login", (req, res) => {
    const { email, senha } = req.body;

    const sql = "SELECT * FROM users WHERE email = ? AND senha = ?";
    db.query(sql, [email, senha], (err, results) => {

        if (err) return res.status(500).json({ error: err });

        if (results.length === 0) {
            return res.status(401).json({ error: "Credenciais inválidas" });
        }

        // usuário encontrado
        const user = results[0];

        res.json({
            success: true,
            message: "Login realizado com sucesso",
            user: {
                id: user.id,
                nome: user.nome,
                email: user.email
            }
        });
    });
});




// LISTAR pets
router.get("/", (req, res) => {
    db.query("SELECT * FROM pets", (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// CADASTRAR pet
router.post("/pets", (req, res) => {
    const { nome, sexo, idade, descricao, imagem } = req.body;

    const sql = "INSERT INTO pets (nome, sexo, idade, descricao, imagem) VALUES (?, ?, ?, ?, ?)";

    db.query(sql, [nome, sexo, idade, descricao, imagem], (err, result) => {
        if (err) return res.status(500).json({ error: err });

        res.json({ id: result.insertId, nome, sexo, idade, descricao, imagem });
    });
});


// PEGAR PET POR ID
router.get("/:id", (req, res) => {
    const id = req.params.id;

    db.query("SELECT * FROM pets WHERE id = ?", [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });

        res.json(results[0]);
    });
});




// exportar
module.exports = router;
