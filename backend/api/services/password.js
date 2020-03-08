
const passport = require('passport');
const keys = require('../config/keys');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const TwitterStrategy = require('passport-twitter').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LineStrategy = require('passport-line2');
const LocalStrategy = require('passport-local');
const jwt = require('jsonwebtoken');
const { token } = require('../redis');
const Reg = require('../helpers/validationReg');
var auth = process.env.NODE_ENV === 'test' ? require('../config/auth.dev.json') : require('../config/auth.json');
const User = require('../models/user');

//Үүсгэх дотоод тохируулга
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {

});

//Тохируулга хийх JWT арга
const jwtOptions = {
    //jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: keys.secret,

};

passport.use(new JwtStrategy(jwtOptions, function (payload, done) {

    token.get(payload.sub).then((user) => {

        if (user === null) {
            return done(null, false, { message: 'Incorrect token.' });
        }
        if (user) {
            return done(null, JSON.parse(user));
        } else {
            return done(null, false, { message: 'Incorrect token.' });
        }

    })

}));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
})
