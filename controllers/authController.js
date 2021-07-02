/**
 * authController
 */
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const userService = require('../services/userService');
const env = require('../config/env');
const bcrypt = require('bcryptjs');

passport.use('login', new localStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
            const user = await userService.findByEmail(email);
            if (! user) {
                return done(null, false, { message: 'User not found' })
            }
            const validate = await comparePassword(user, password);
            if (! validate) {
                return done(null, false, { message: 'Wrong password' })
            }
            return done(null, user, { message: 'Login successful' })
        } catch (e) {
            return done(e)
        }
    })
);

passport.use(new JWTStrategy({
        secretOrKey: env.SECRET_TOKEN,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    }, async (token, done) => {
        try {
            return done(null, token.user)
        } catch (e) {
            return done(e);
        }
    }
));

async function comparePassword(user, password) {
    return await bcrypt.compare(password, user.password);
}

module.exports = {
    isAdmin: (req, res, next) => {
        if (req.user.is_admin) {
            return next();
        }
        return res.status(401).send({ message: 'Unauthorized' });
    },

    register: async (req, res, next) => {
        const data = await userService.register(req.body);
        return res.status(201).send({ data });
    }
};