const express = require('express');
const router = express.Router();

/* GET root. */
router.get('/', function(req, res, next) {
  res.send('Poke-api');
});

module.exports = router;
