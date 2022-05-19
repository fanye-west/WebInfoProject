const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const SALT_FACTOR = 10 // salt factor for password
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

// verify password function which uses bcrypt to hash the password entered by the user and compare that with the hash stored in the DB
clinicianSchema.methods.verifyPassword = function(password, callback) {
    bcrypt.compare(password, this.password, (err, valid) => {
        callback(err, valid)
    })
}

// use bcrypt to hash the password before saving it in the DB
clinicianSchema.pre('save', function save(next) {
    const clincian = this

    // Go to next if password field has not been modified 
    if (!clincian.isModified('password')) {
        return next()
    }

    // Automatically generate salt, and calculate hash
    bcrypt.hash(clincian.password, SALT_FACTOR, (err, hash) => {
        if (err)
            return next(err)

        // Replace password with hash
        clincian.password = hash
        next()
    })
})

const Clinician = mongoose.model('Clinician', clinicianSchema)
module.exports = Clinician