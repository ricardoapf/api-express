const express = require('express');
const router = express.Router();
const pokemonCtr = require('../controllers/pokemonController');
const userCtr = require('../controllers/userController');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const authCtr = require('../controllers/authController');
const env = require('../config/env');
const middleware = passport.authenticate('jwt', { session: false });
const isAdminMiddleware = authCtr.isAdmin;

/* GET root. */
router.get('/', (req, res, next) => {
    res.send('Poke-api');
});

/* login. */
router.post('/login', (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err || ! user) {
                return res.status(401).send({
                    message: 'credentials invalid'
                });
            }
            req.login(user, { session: false }, async (err) => {
                if (err) {
                    return res.status(401).send({
                        error: err,
                        message: 'An error has occurred, please try again later'
                    });
                }
                const token = jwt.sign({ user }, env.SECRET_TOKEN);
                return res.send({ token });
            });
        } catch (e) {
            return next(e);
        }
    })(req, res, next)
});

/* register.  */
router.post('/register', authCtr.register);

/* Middleware */
router.use(middleware);

/* Profile. */
router.get('/profile', (req, res, next) => {
    const user = {
        'id': req.user.id,
        'name': req.user.name,
        'last_name': req.user.last_name,
        'email': req.user.email,
        'is_admin': req.user.is_admin
    };
    return res.send({ user });
});

/* pokemons routes. */
router.get('/pokemons', pokemonCtr.index);
router.post('/pokemons', isAdminMiddleware, pokemonCtr.store);
router.get('/pokemons/:id', isAdminMiddleware, pokemonCtr.show);
router.put('/pokemons/:id', isAdminMiddleware, pokemonCtr.update);
router.delete('/pokemons/:id', isAdminMiddleware, pokemonCtr.delete);

/* users routes. */
router.get('/users/:id/pokemons', isAdminMiddleware, userCtr.pokemons);
router.get('/users', isAdminMiddleware, userCtr.index);
router.post('/users', isAdminMiddleware, userCtr.store);
router.get('/users/pokemons', userCtr.pokemons);
router.get('/users/:id', isAdminMiddleware, userCtr.show);
router.put('/users/:id', isAdminMiddleware, userCtr.update);
router.delete('/users/:id', isAdminMiddleware, userCtr.delete);
router.post('/users/pokemons/toggle-like', userCtr.togglePokemon);

module.exports = router;
