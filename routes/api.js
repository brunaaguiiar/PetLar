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

        const user = results[0];

        res.json({
            message: "Login realizado com sucesso",
            user: {
                id: user.id,
                nome: user.nome,
                email: user.email
            }
        });
    });
});


// ----------------------
// ROTA GET - Listar
// ----------------------
router.get('/', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) return res.status(500).json({ error: err });

        res.json(results);
    });
});

// ----------------------
// ROTA PUT - Editar
// ----------------------
router.put('/:id', (req, res) => {
    const { nome, email } = req.body;
    const { id } = req.params;

    db.query(
        'UPDATE users SET nome = ?, email = ? WHERE id = ?',
        [nome, email, id],
        (err) => {
            if (err) return res.status(500).json({ error: err });

            res.json({ id, nome, email });
        }
    );
});

// ----------------------
// ROTA DELETE - Excluir
// ----------------------
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err });

        res.sendStatus(204);
    });
});

// exportar
module.exports = router;
