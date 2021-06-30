const express = require('express');
const router = express.Router();
const userCtr = require('../controllers/userController');

/* GET pokemons listing. */
router.get('/', userCtr.index);
router.post('/', userCtr.store);
router.get('/:id', userCtr.show);
router.put('/:id', userCtr.update);
router.delete('/:id', userCtr.delete);

module.exports = router;
