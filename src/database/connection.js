const knex = require('knex')({
    client: 'pg',
    connection: {
        host: process.env.HOST,
        port: process.env.PORT_POSTGRES,
        user: process.env.USER,
        password: process.env.PASS,
        database: process.env.DATABASE,
        ssl: { rejectUnauthorized: false }
    }
});

module.exports = { knex };