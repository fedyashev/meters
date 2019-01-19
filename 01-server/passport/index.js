const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const crypt = require('../lib/crypt');
const {User, UserRole} = require('../models');
const secret = require('./secret.json');

passport.use('login', new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password'
}, async (login, password, done) => {
    try {
        const user = await User.findOne({
            where: {login: login},
            include: [{model: UserRole}]
        });
        if (!user) {
            return done(null, false);
        }
        const isPasswordValid = await crypt.comparePassword(password, user.passwordHash);
        if (!isPasswordValid) {
            return done(null, false, {message: 'Invalid password'});
        }
        return done(null, {
            id: user.id,
            login: user.login,
            role: user.UserRole.role
        });
    } catch (err) {
        return done(err);
    }
}));

passport.use('jwt', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret.key
}, async (token, done) => {
    try {
        const user = await User.findOne({
            where: {id: token.user.id},
            include: [{model: UserRole}]
        });
        if (!user) {
            return done(null, false);
        }
        return done(null, {
            id: user.id,
            login: user.login,
            role: user.UserRole.role
        });
    } catch (err) {
        return done(err, false);
    }
}));