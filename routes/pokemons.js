const express = require('express');
const router = express.Router();
const pokemonCtr = require('../controllers/pokemonController.js');

/* GET pokemons listing. */
router.get('/', pokemonCtr.index);
router.post('/', pokemonCtr.store);
router.get('/:id', pokemonCtr.show);
router.put('/:id', pokemonCtr.update);
router.delete('/:id', pokemonCtr.delete);

module.exports = router;
