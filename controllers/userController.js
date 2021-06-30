/**
 * pokemonController
 */
const userService = require('../services/userService');

module.exports = {
    index: async (req, res) => {
        const data = await userService.find(req.params);
        res.status(200).send({ data });
    },

    show: async (req, res) => {
        const data = await userService.findOne(req.params);
        res.status(200).send({ data });
    },

    store: async (req, res) => {
        const data = await userService.create(req.body);
        res.status(201).send({ data });
    },

    update: async (req, res) => {
        const data = await userService.update(req.params, req.body);
        res.status(200).send({ data });
    },

    delete: async (req, res) => {
        const data = await userService.destroy(req.params, req.body);
        res.status(200).send({ data });
    }
};

