/**
 * pokemonService
 */
const util = require('util');
const con = require('../config/database');
let query = util.promisify(con.query).bind(con);
const helpers = require('../helpers/pagination');

module.exports = {
    find: async (params) => {
        try {
            const records = await query('SELECT count(*) as totalItems FROM pokemons');
            const metaData = helpers.pagination(params, records);
            const pokemons = await query(`SELECT * FROM pokemons LIMIT ${metaData.limit}`);
            return {
                data: pokemons,
                meta_data: metaData
            };
        } catch (e) {
            console.log(e)
        }
    },

    findOne: async (params) => {
        try {
            const { id } = params;
            return await getPokemon(id);
        } catch (e) {
            console.log(e)
        }
    },

    create: async (body) => {
        try {
            const { name, description, image_url, date, released, type, category } = body;
            return await query(
                'INSERT INTO pokemons (name, description, image_url, date, released, type, category) VALUES (?,?,?,?,?,?,?)',
                [name, description, image_url, date, released, type, category]
            );
        } catch (e) {
            console.log(e)
        }
    },

    update: async (params, body) => {
        try {
            const { id } = params;
            const { name, description, image_url, date, released, type, category } = body;
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
        try {
            const { id } = params;
            const pokemon = await getPokemon(id);
            await query('DELETE FROM pokemons WHERE id = ?', [+id]);
            return pokemon;
        } catch (e) {
            console.log(e)
        }
    }
};

async function getPokemon(id) {
    return await query('SELECT * FROM pokemons WHERE id = ?', [+id]);
}