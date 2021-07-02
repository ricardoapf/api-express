/**
 * userservice
 */
const util = require('util');
const con = require('../config/database');
const bcrypt = require('bcryptjs');
const query = util.promisify(con.query).bind(con);
const helpers = require('../helpers/pagination');

module.exports = {
    find: async (params) => {
        try {
            const records = await query('SELECT count(*) as totalItems FROM users');
            const metaData = helpers.pagination(params, records);
            const users = await query(`SELECT id, name, last_name, email, is_admin FROM users LIMIT ${metaData.limit}`);
            return {
                data: users,
                meta_data: metaData
            };
        } catch (e) {
            console.log(e)
        }
    },

    findOne: async (params) => {
        try {
            const { id } = params;
            return await getUser(id);
        } catch (e) {
            console.log(e)
        }
    },

    create: async (body) => {
        try {
            const { name, last_name, email, is_admin, password } = body;
            const encryptPassword = await setEncryptPassword(password);
            await query(
                'INSERT INTO users (name, last_name, email, is_admin, password) VALUES (?,?,?,?,?)',
                [name, last_name, email, is_admin, encryptPassword]
            );
            return await getLastUser();
        } catch (e) {
            console.log(e)
        }
    },

    update: async (params, body) => {
        try {
            const { id } = params;
            const { name, last_name, email, is_admin, password } = body;
            const encryptPassword = await setEncryptPassword(password);
            await query(
                'UPDATE users SET name=?, last_name=?, email=?, is_admin=?, password=? WHERE id=?',
                [name, last_name, email, is_admin, encryptPassword, +id]
            );

            return await getUser(id);
        } catch (e) {
            console.log(e)
        }
    },

    destroy: async (params) => {
        try {
            const { id } = params;
            const user = await getUser(id);
            await query('DELETE FROM users WHERE id = ?', [+id]);
            return user;
        } catch (e) {
            console.log(e)
        }
    },

    findByEmail: async (email) => {
        try {
            const user = await query('SELECT id, name, last_name, email, is_admin, password FROM users WHERE email = ?', [email]);
            if (user.length > 0) {
                return user[0];
            }
            return null;

        } catch (e) {
            console.log(e);
        }
    },

    register: async (body) => {
        try {
            const { name, last_name, email, password } = body;
            const encryptPassword = await setEncryptPassword(password);
            await query(
                'INSERT INTO users (name, last_name, email, is_admin, password) VALUES (?,?,?,?,?)',
                [name, last_name, email, 0, encryptPassword]
            );
            return await getLastUser();
        } catch (e) {
            console.log(e)
        }
    },

    togglePokemon: async (user, body) => {
        try {
            const userId = user.id;
            const pokemonId = body.pokemon_id;
            const isLiked = await validateIsLikedPokemon(userId, pokemonId);

            if (isLiked) {
                return await dislikePokemon(userId, pokemonId);
            }
            return await likePokemon(userId, pokemonId);
        } catch (e) {
            console.log(e)
        }
    },

    pokemons: async (reqUserId, body, params) => {
        try {
            let userId = reqUserId;
            const pokemonId = body.pokemon_id;
            if (params.id) {
                userId = params.id;
            }
            return await userPokemons(userId, pokemonId);
        } catch (e) {
            console.log(e)
        }
    }
};

async function getUser(id) {
    return await query('SELECT id, name, last_name, email, is_admin FROM users WHERE id = ?', [+id]);
}

async function setEncryptPassword(password) {
    return await bcrypt.hash(password, 10);
}

async function dislikePokemon(userId, pokemonId) {
    return await query(
        'DELETE FROM user_pokemons WHERE user_id=? AND pokemon_id=?',
        [userId, pokemonId]
    );
}

async function likePokemon(userId, pokemonId) {
    return await query(
        'INSERT INTO user_pokemons (user_id, pokemon_id) VALUES (?,?)',
        [userId, pokemonId]
    );
}

async function validateIsLikedPokemon(userId, pokemonId) {
    const data = await query('SELECT * FROM user_pokemons WHERE user_id=? AND pokemon_id=?',
        [userId, pokemonId]
    );
    return data.length > 0;
}

async function userPokemons(userId) {
    const userPokemons = await query('SELECT * FROM user_pokemons WHERE user_id=?',
        [userId]
    );
    const userPokemonIds = userPokemons.map(v => v.pokemon_id);
    if (userPokemonIds.length > 0) {
        return await query(`SELECT * FROM pokemons WHERE id IN ?`, [[userPokemonIds]]);
    }
    return userPokemonIds;
}

async function getLastUser() {
    return query('SELECT id, name, last_name, email, is_admin FROM users ORDER BY id DESC LIMIT 1')
}