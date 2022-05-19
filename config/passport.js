const passport = require('passport')
const { off } = require('process')
const Clinician = require('../models/clinician')
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
        console.log(user == null)
        if (user == null) {
            Clinician.findById(userId, { password: 0 }, (err, user) => {
                if (err) {
                    return done(err, undefined)
                }
                console.log(user)
                return done(undefined, user)
            })
        } else {
            return done(undefined, user)
        }
    })
})

// Clinician.findById(userId, { password: 0 }, (err, user) => {
//     if (err)
//         return done(err, undefined)
// })


passport.use('patient-local',
    new LocalStrategy((username, password, done) => {
        console.log('patient strategy')
        Patient.findOne({ user_name: username }, {}, {}, (err, user) => {
            if (err) {
                console.log('error')
                return done(undefined, false, { message: 'unknown error' })
            }
            if (!user) {
                console.log('username')
                return done(undefined, false, { message: 'username' })
            }
            user.verifyPassword(password, (err, valid) => {

                if (err) {
                    console.log('error password')
                    return done(undefined, false, { message: 'unknown' })
                }
                if (!valid) {
                    console.log('password is not valid')
                    return done(undefined, false, { message: 'password' })
                }
                return done(undefined, user)
            })
        })
    }))

passport.use('clinician-local',
    new LocalStrategy((username, password, done) => {
        console.log('clinician strategy running')
        Clinician.findOne({ user_name: username }, {}, {}, (err, user) => {
            if (err) {
                console.log('error')
                return done(undefined, false, { message: 'unknown error' })
            }
            if (!user) {
                console.log('username')
                return done(undefined, false, { message: 'username' })
            }
            user.verifyPassword(password, (err, valid) => {

                if (err) {
                    console.log('error password')
                    return done(undefined, false, { message: 'unknown' })
                }
                if (!valid) {
                    console.log('password')
                    return done(undefined, false, { message: 'password' })
                }
                console.log('hi')
                return done(undefined, user)
            })
        })
    }))


module.exports = passport