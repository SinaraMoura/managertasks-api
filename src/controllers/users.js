const { knex } = require("../database/connection");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const listUsers = async (req, res) => {
    try {
        const user = await knex('users');
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor' })
    }
}
const registerUsers = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const queryVerifyEmail = await knex('users').where('email', email).debug();
        if (queryVerifyEmail.length > 0) {
            return res.status(404).json({ message: "E-mail informado já existente." });
        }
        const encryptionPassword = await bcrypt.hash(password, 10);
        const queryRegistration = await knex('users').insert({ name, email, password: encryptionPassword }).returning('*');
        return res.status(201).json({ message: "O usuario foi cadastrado com sucesso!" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await knex('users').where('email', email);
        if (!user.length) {
            return res.status(400).json({ message: "Usuário e/ou senha inválido(a)." });
        }
        const correctPass = await bcrypt.compare(password, user[0].password);
        if (!correctPass) {
            return res.status(400).json({ message: "Usuário e/ou senha inválido(a)." });
        }
        const token = jwt.sign({ id: user[0].id }, process.env.JWT_PASS, { expiresIn: "8h" });
        const { password: _, ...userLogin } = user[0];
        return res.json({
            ...userLogin,
            token
        });
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const verifyEmail = async (req, res) => {
    const { email } = req.query;
    try {
        const existEmail = await knex('users').where({ email });
        if (existEmail.length) {
            return res.status(404).json({ message: "E-mail informado já existente." });
        }
        return res.status(200).send();
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const verifyUser = async (req, res) => {
    try {
        return res.status(200).json(req.user);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}



module.exports = { registerUsers, login, listUsers, verifyEmail, verifyUser }