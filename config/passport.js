const passport = require('passport')
const Patient = require('../models/patient')
const LocalStrategy = require('passport-local').Strategy
    // Hardcode user for now
    // Serialize information to be stored in session/cookie
passport.serializeUser((user, done) => {
        // Use id to serialize user
        done(undefined, user._id)
    })
    // When a request comes in, deserialize/expand the serialized information
    // back to what it was (expand from id to full user)
passport.deserializeUser((userId, done) => {
        Patient.findById(userId, { password: 0 }, (err, user) => {
            if (err) {
                return done(err, undefined)
            }
            return done(undefined, user)
        })
    })
    // Define local authentication strategy for Passport
    // http://www.passportjs.org/docs/downloads/html/#strategies
passport.use(
    new LocalStrategy((username, password, done) => {
        Patient.findOne({ username: 'user_name' }, {}, {}, (err, user) => {
            if (err)
                return done(undefined, false, { message: 'unknown error' })
            if (!user)
                return done(undefined, false, { message: 'username' })
            user.verifyPassword(password, (err, valid) => {
                if (err)
                    return done(undefined, false, { message: 'unknown' })
                if (!valid)
                    return done(undefined, false, { message: 'password' })
                return done(undefined, user)
            })
        })
    })
)

module.exports = passport