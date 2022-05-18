require('dotenv').config()
const Patient = require('../models/patient');
const mongoose = require('mongoose')
require('../models')
mock_patient = {
    first_name: 'testUserPassport',
    last_name: 'is a new user',
    user_name: 'passport',
    password: 'password',
    email: "user@gmail.com",
    dob: "01/01/1998",
    bio: "Just a simple made up user, trying their best",
    data: [],
    messages: ["Keep up the good work!"],
    badge: "Gold",
    rank: "1",
    notes: [],
    glucose_bounds: [0, 7.1],
    weight_bounds: [58, 65],
    insulin_bounds: [1, 3],
    exercise_bounds: [9000, 25000],
    glucose_required: true,
    weight_required: false,
    insulin_required: true,
    exercise_required: false
}
newPatient = new Patient(mock_patient)
patientID = newPatient._id.toString()
console.log("Created new patient " + newPatient.first_name + " " + newPatient.last_name + ", id: " + newPatient._id)
newPatient.save()