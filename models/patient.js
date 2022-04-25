const mongoose = require('mongoose')
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
    glucose_required: Boolean,
    weight_required: Boolean,
    insulin_required: Boolean,
    exercise_required: Boolean
})

const Patient = mongoose.model('Patient', patientSchema)

module.exports = Patient