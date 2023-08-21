require('dotenv').config();
const jwt = require("jsonwebtoken");
const { knex } = require("../database/connection");

const authorization = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ message: 'Não autorizado' })
    }
    const token = authorization.split(' ')[1];
    try {
        const { id } = jwt.verify(token, process.env.JWT_PASS);
        const user = await knex('users').where({ id }).first();
        if (!user) {
            return res.status(404).json({ message: 'Não autorizado' })
        }
        const { password: _, ...userLogado } = user;
        req.user = userLogado;
        next();
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}
module.exports = { authorization };