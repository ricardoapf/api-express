/**
 * pokemonController
 */
const userService = require('../services/userService');

module.exports = {
    index: async (req, res) => {
        const data = await userService.find(req.query);
        return res.status(200).send({ ...data });
    },

    show: async (req, res) => {
        const data = await userService.findOne(req.params);

        if (data.length) {
            return res.status(200).send({ data });
        }
        return res.status(404).send({ message: 'user not found' });
    },

    store: async (req, res) => {
        const data = await userService.create(req.body);
        return res.status(201).send({ data });
    },

    update: async (req, res) => {
        const data = await userService.update(req.params, req.body);
        return res.status(200).send({ data });
    },

    delete: async (req, res) => {
        const data = await userService.destroy(req.params, req.body);
        return res.status(200).send({ data });
    },

    togglePokemon: async (req, res) => {
        await userService.togglePokemon(req.user, req.body);
        return res.status(200).send({ message: 'action successful' });
    },

    pokemons: async (req, res) => {
        const data = await userService.pokemons(req.user.id, req.body, req.params);
        return res.status(200).send({ data });
    }
};

