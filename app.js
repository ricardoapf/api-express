const express = require('express');
const indexRouter = require('./routes/index');
const pokemonsRouter = require('./routes/pokemons');
const usersRouter = require('./routes/users');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pokemons', pokemonsRouter);

module.exports = app;
