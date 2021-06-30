const express = require('express');
const indexRouter = require('./routes/index');
const pokemonsRouter = require('./routes/pokemons');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);
app.use('/pokemons', pokemonsRouter);

module.exports = app;
