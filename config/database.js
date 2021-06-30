const mysql = require('mysql');
const env = process.env;

const con = mysql.createConnection({
    host: env.DB_HOST || 'localhost',
    user: env.DB_USER || 'root',
    password: env.DB_PASSWORD || '',
    database: env.DB_NAME || 'poke_api',
});

module.exports = con;