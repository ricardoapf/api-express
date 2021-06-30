/**
 * pokemonController
 */
const pokemonService = require('../services/pokemonService');

module.exports = {
    index: async (req, res) => {
        const data = await pokemonService.find(req.params);
        res.status(200).send({ data });
    },

    show: async (req, res) => {
        const data = await pokemonService.findOne(req.params);
        res.status(200).send({ data });
    },

    store: async (req, res) => {
        const data = await pokemonService.create(req.body);
        res.status(201).send({ data });
    },

    update: async (req, res) => {
        const data = await pokemonService.update(req.params, req.body);
        res.status(200).send({ data });
    },

    delete: async (req, res) => {
        const data = await pokemonService.destroy(req.params, req.body);
        res.status(200).send({ data });
    }
};

