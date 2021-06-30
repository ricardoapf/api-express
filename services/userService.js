/**
 * userservice
 */
const util = require('util');
const con = require('../config/database');
const bcrypt = require('bcryptjs');
const query = util.promisify(con.query).bind(con);

module.exports = {
    find: async (params) => {
        try {
            return await query('SELECT name, last_name, email, is_admin FROM users');
        } catch (e) {
            console.log(e)
        }
    },

    findOne: async (params) => {
        const { id } = params;
        try {
            return await getUser(id);
        } catch (e) {
            console.log(e)
        }
    },

    create: async (body) => {
        const { name, last_name, email, is_admin, password } = body;
        const encryptPassword = await setEncryptPassword(password);
        try {
            return await query(
                'INSERT INTO users (name, last_name, email, is_admin, password) VALUES (?,?,?,?,?)',
                [name, last_name, email, is_admin, encryptPassword]
            );
        } catch (e) {
            console.log(e)
        }
    },

    update: async (params, body) => {
        const { id } = params;
        const { name, last_name, email, is_admin, password } = body;
        try {
            await query(
                'UPDATE users SET name=?, last_name=?, email=?, is_admin=?, password=? WHERE id=?',
                [name, last_name, email, is_admin, password, +id]
            );

            return await getUser(id);
        } catch (e) {
            console.log(e)
        }
    },

    destroy: async (params) => {
        const { id } = params;
        try {
            const user = await getUser(id);
            await query('DELETE FROM users WHERE id = ?', [+id]);
            return user;
        } catch (e) {
            console.log(e)
        }
    }
};

async function getUser(id) {
    return await query('SELECT * FROM users WHERE id = ?', [+id]);
}

async function setEncryptPassword(password) {
    return await new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, function (err, hash) {
            if (err) reject(err)
            resolve(hash)
        });
    })
}