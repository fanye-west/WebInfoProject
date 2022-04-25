const mongoose = require('mongoose')

const valueSchema = new mongoose.Schema({
    is_recorded: Boolean,
    is_required: Boolean,
    value: Number,
    comment: String,
    when: { type: Date, default: Date.now }
})

const dataSchema = new mongoose.Schema({
    glucose: valueSchema,
    weight: valueSchema,
    insulin: valueSchema,
    exercise: valueSchema,
    date: { type: Date, default: Date.now }
})

const noteSchema = new mongoose.Schema({
    text: String,
    date: { type: Date, default: Date.now }
})

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
    exercise_bounds: [Number, Number]

})

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
const Patient = mongoose.model('Patient', patientSchema)
const Data = mongoose.model('Data', dataSchema)
const Value = mongoose.model('Value', valueSchema)
const Note = mongoose.model('Note', noteSchema)

module.exports = { Clinician, Patient, Data, Value, Note }