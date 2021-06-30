/**
 * pokemonService
 */
const util = require('util');
const con = require('../config/database');
let query = util.promisify(con.query).bind(con);

module.exports = {
    find: async (params) => {
        try {
            return await query('SELECT * FROM pokemons');
        } catch (e) {
            console.log(e)
        }
    },

    findOne: async (params) => {
        const { id } = params;
        try {
            return await getPokemon(id);
        } catch (e) {
            console.log(e)
        }
    },

    create: async (body) => {
        const { name, description, image_url, date, released, type, category } = body;
        try {
            return await query(
                'INSERT INTO pokemons (name, description, image_url, date, released, type, category) VALUES (?,?,?,?,?,?,?)',
                [name, description, image_url, date, released, type, category]
            );
        } catch (e) {
            console.log(e)
        }
    },

    update: async (params, body) => {
        const { id } = params;
        const { name, description, image_url, date, released, type, category } = body;
        try {
            await query(
                'UPDATE pokemons SET name=?, description=?, image_url=?, date=?, released=?, type=?, category=? WHERE id=?',
                [name, description, image_url, date, released, type, category, +id]
            );

            return await getPokemon(id);
        } catch (e) {
            console.log(e)
        }
    },

    destroy: async (params) => {
        const { id } = params;
        try {
            const pokemon = await getPokemon(id);
            await query('DELETE FROM pokemons WHERE id = ?', [+id]);
            return pokemon;
        } catch (e) {
            console.log(e)
        }
    },
};

async function getPokemon(id) {
    return await query('SELECT * FROM pokemons WHERE id = ?', [+id]);
}