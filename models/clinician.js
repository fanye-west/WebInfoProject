const mongoose = require('mongoose')
const patientSchema = require('patient').schema

const clinicianSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    user_name: String,
    password: String,
    email: String,
    dob: Date,
    bio: String,
    patients: [patientSchema]
})

const Clinician = mongoose.model('Clinician', clinicianSchema)

module.exports = Clinician