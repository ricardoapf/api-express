/**
 * pokemonController
 */
const pokemonService = require('../services/pokemonService');

module.exports = {
    index: async (req, res) => {
        const data = await pokemonService.find(req.query);
        return res.status(200).send({ ...data });
    },

    show: async (req, res) => {
        const data = await pokemonService.findOne(req.params);
        if (data.length) {
            return res.status(200).send({ data });
        }
        return res.status(404).send({ message: 'pokemon not found' });
    },

    store: async (req, res) => {
        const data = await pokemonService.create(req.body);
        return res.status(201).send({ data });
    },

    update: async (req, res) => {
        const data = await pokemonService.update(req.params, req.body);
        return res.status(200).send({ data });
    },

    delete: async (req, res) => {
        const data = await pokemonService.destroy(req.params, req.body);
        return res.status(200).send({ data });
    }
};

