const mongoose = require('mongoose')
const dataSchema = require('../models/data').schema
const noteSchema = require('../models/note').schema
const bcrypt = require('bcryptjs')

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
    glucose_required: Boolean,
    weight_required: Boolean,
    insulin_required: Boolean,
    exercise_required: Boolean
})

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