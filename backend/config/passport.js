const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userCredentials.model');

const customFields = {
    usernameField: 'username',
    passwordField: 'password'
};

const verifyCallBack = (username, password, done) => {
    User.findOne({ username: username})
    .then((user) => {
        if (!user) { return done(null, false) }

        //const isValid = validPassword(password, user.password);
        if (password === user.password) {
            return done(null, user);
        } else {
            return done(null, false);
        }
        
    })
    .catch((err) => {
        done(err);
    });
}

const strategy = new LocalStrategy(customFields, verifyCallBack);

passport.use(strategy)

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
    .then ((user) => {
        done(null, user);
    })
    .catch(err => done(err))
});