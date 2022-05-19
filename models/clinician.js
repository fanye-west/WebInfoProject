const mongoose = require('mongoose')
const patientSchema = require('../models/patient').schema
const bcrypt = require('bcryptjs')

const clinicianSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    user_name: String,
    password: String,
    email: String,
    dob: Date,
    bio: String,
    patients: [String]
})
clinicianSchema.methods.verifyPassword = function(password, callback) {
    bcrypt.compare(password, this.password, (err, valid) => {
        console.log(password, '\n', this.password)
        callback(err, valid)
    })
}

// Hash password before saving
clinicianSchema.pre('save', function save(next) {
    const clincian = this
        // Go to next if password field has not been modified 
    if (!clincian.isModified('password')) {
        return next()
    }
    // Automatically generate salt, and calculate hash
    bcrypt.hash(clincian.password, 10, (err, hash) => {
        if (err) {
            return next(err)
        }
        // Replace password with hash
        clincian.password = hash
        next()
    })
})

const Clinician = mongoose.model('Clinician', clinicianSchema)

module.exports = Clinician