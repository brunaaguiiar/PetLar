//importar o express
const express = require('express');

//middleware
const router = express.Router();

//trazer a conecxão com o banco de dados
const db = require('../db');    

//criar rotas 
//cadastrar um usuario: /api/users/
router.post('/', (req, res) => {
    const { nome, email } = req.body;

    //executar a instrução SQL
    db.query('INSERT INTO users (nome, email) VALUES (?, ?)', [nome, email], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({ id: result.insertId, nome, email });
    });
});
 module.exports = router;