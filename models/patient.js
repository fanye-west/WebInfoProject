/* schema for a patient */
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const dataSchema = require('../models/data').schema
const noteSchema = require('../models/note').schema

const patientSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    user_name: String,
    password: String,
    email: String,
    dob: Date,
    bio: String,
    data: [dataSchema],
    messages: [String],
    badge: String,
    rank: Number,
    notes: [noteSchema],
    glucose_bounds: [Number, Number],
    weight_bounds: [Number, Number],
    insulin_bounds: [Number, Number],
    exercise_bounds: [Number, Number],
    glucose_required: {
        type: Boolean,
        default: false
    },
    weight_required: {
        type: Boolean,
        default: false
    },
    insulin_required: {
        type: Boolean,
        default: false
    },
    exercise_required: {
        type: Boolean,
        default: false
    }
})

// verify password function which uses bcrypt to hash the password entered by the user and compare that with the hash stored in the DB
patientSchema.methods.verifyPassword = function(password, callback) {
    bcrypt.compare(password, this.password, (err, valid) => {
        callback(err, valid)
    })
}


// Hash password before saving
patientSchema.pre('save', function save(next) {
    const patient = this

    // Go to next if password field has not been modified 
    if (!patient.isModified('password')) {
        return next()
    }

    // Automatically generate salt, and calculate hash
    bcrypt.hash(patient.password, 10, (err, hash) => {
        if (err) {
            return next(err)
        }

        // Replace password with hash
        patient.password = hash
        next()
    })
})

const Patient = mongoose.model('Patient', patientSchema)
module.exports = Patient