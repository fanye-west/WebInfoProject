const Patient = require('../models/patient');
const Clinician = require('../models/clinician');
const Value = require('../models/value');
const Data = require('../models/data');
const LeaderboardEntry = require('../models/leaderboardentry.js');
require('../models')

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//Clear Tables
Patient.deleteMany({})

patient_first_names = ["Jenny", "Anthony", "Scott", "Pauline", "Jarad", "Matt", "James", "George", "Rod", "Helen", "Sammy"]
patient_last_names = ["Holmes", "Brown", "Smith", "McPherson", "Nguyen", "Ajit", "Park", "Hadlow", "Ye", "Holtes", "Khandelwal"]

var p, i, id;
var date
var N = 15;
var data;
var ClinicianPatientIDs = []

for (p = 0; p < patient_first_names.length; p++) {
    mock_patient = {
        first_name: patient_first_names[p],
        last_name: patient_last_names[p],
        user_name: patient_first_names[p][0] + patient_last_names[p],
        password: "password",
        email: patient_first_names[p][0] + patient_last_names[p] + "@gmail.com",
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
    ClinicianPatientIDs.push(patientID)
    console.log("Created new patient " + patient_first_names[p] + " " + patient_last_names[p] + ", id: " + patientID)
        //Add data
    data = []
    for (i = 0; i < N; i++) {
        date = new Date();
        date.setDate(date.getDate() - (N - i))
        glucose = new Value({
            is_recorded: true,
            value: getRandomInt(10),
            comment: "my glucose comment: " + i,
            when: date,
        })
        weight = new Value({
            is_recorded: true,
            value: getRandomInt(10) + 60,
            comment: "my weight comment: " + i,
            when: date,
        })
        insulin = new Value({
            is_recorded: true,
            value: getRandomInt(3),
            comment: "my insulin comment: " + i,
            when: date,
        })
        exercise = new Value({
            is_recorded: true,
            value: getRandomInt(10000) + 5000,
            comment: "my exercise comment: " + i,
            when: date,
        })
        newdata = new Data({
            glucose: glucose,
            weight: weight,
            insulin: insulin,
            exercise: exercise,
            num_required: 2,
            num_required_provided: 2,
            date: date
        })
        data.push(newdata)
    }
    newPatient.data = data
    newPatient.save() //Add to DB

    LeaderboardEntry.updateOne({ patient_id: patientID }, {
        patient_id: patientID,
        engagement_rate: 100,
        username: newPatient.user_name
    }, { upsert: true }).exec();
}

console.log("new patients created: ", ClinicianPatientIDs)

mock_clinician = {
    first_name: "Thora",
    last_name: "Tunison",
    user_name: "TTunison",
    password: "password",
    email: "TT80@hotmail.com",
    dob: "1/12/1980",
    bio: "Just a simple made up doctor, trying their best",
    patients: ClinicianPatientIDs
}

newClinician = new Clinician(mock_clinician)
newClinician.save()
console.log("new clinician")
id = newClinician._id.toString()
console.log("Created new clincian, id: " + id.toString())