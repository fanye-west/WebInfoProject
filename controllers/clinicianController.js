//Import Models
const res = require('express/lib/response');
const Clinician = require('../models/clinician');
const Patient = require('../models/patient');
const Value = require('../models/value');
const Data = require('../models/data');
const Note = require('../models/note');
const LeaderboardEntry = require('../models/leaderboardentry.js');
const passport = require('../config/passport')
const express = require('express')
const router = express.Router()

require('../models')

var warning_colour = "#FAC8C5"
var required_symbol = "❗"

//Deliverable 2 Hardcoded values
// const ClinicianID = "628085744fe82f14cb55d5e9" //SEEDED CLINICIAN: "6275ca17e6f40fa90c688bc5"
// var VISITED_LOGIN = false

//Utils
function isToday(date) {
    const today = new Date()
    let check = date.getDate() == today.getDate() &&
        date.getMonth() == today.getMonth() &&
        date.getFullYear() == today.getFullYear()
    return check
}

function isMissing(data) {
    return data == "" || data == undefined
}

function boolToChecked(bool) {
    if (bool) {
        return "checked";
    } else {
        return "";
    }
}

function checkedToBool(checked) {
    if (checked == "on") {
        return true;
    }
    return false;
}

function isValidBounds(lower, upper) {
    //Check that inputs are numbers
    if (isNaN(lower)) { return false; }
    if (isNaN(upper)) { return false; }
    //Check that lower <= upper
    if (lower > upper) { return false; }
    return true;
}

// Main functions

const getClinicianLogin = async(req, res, next) => {
    try {
        return res.render('clinicianLogin', { layout: 'loginLayout' });
    } catch (err) {
        return next(err)
    }
}

const clinicianLoginRedirect = async(req, res, next) => {
    //Checks login for deliverable 2
    router.post('/login',
        passport.authenticate('clinician-local', {
            successRedirect: '/user/clinician/',
            failureRedirect: '/user/clinician/login',
            failureFlash: true
        })
    )
}

const clinicianLogoutRedirect = async(req, res, next) => {
    //Checks login for deliverable 2
    try {
        VISITED_LOGIN = false
        return res.redirect('/')
    } catch (err) {
        return next(err)
    }
}

const getClinicianDash = async(req, res, next) => {
    try {
        let ClinicianID = req.user._id.toString();
        const clinicianData = await Clinician.findById(ClinicianID).lean()
        let today = new Date()
        patientsLatest = [] // Each patent has {first_name, last_name, is_not_today (* if not today, else empty), glucose_value, glucose_colour, ...}
        let i
        let patientDataPackage
        let patientData

        if (typeof(req.query.name) === 'undefined' || req.query.name === "") {
            // Display all patients if none are searched for
            for (i = 0; i < clinicianData.patients.length; i++) {
                patientID = clinicianData.patients[i]
                patientData = await Patient.findById(patientID).lean()
                patientDataPackage = {
                    first_name: patientData.first_name,
                    last_name: patientData.last_name,
                    patient_link: "/user/clinician/patientdetails?" + "id=" + patientID
                }
                if (patientData.data.length > 0) {
                    patientDataPackage.glucose_value = patientData.data[patientData.data.length - 1].glucose.value
                    patientDataPackage.weight_value = patientData.data[patientData.data.length - 1].weight.value
                    patientDataPackage.insulin_value = patientData.data[patientData.data.length - 1].insulin.value
                    patientDataPackage.exercise_value = patientData.data[patientData.data.length - 1].exercise.value
                } else {
                    patientDataPackage.glucose_value = undefined
                    patientDataPackage.weight_value = undefined
                    patientDataPackage.insulin_value = undefined
                    patientDataPackage.exercise_value = undefined
                }
                //Highlight values that are outside bounds
                if (patientDataPackage.glucose_value < patientData.glucose_bounds[0] || patientDataPackage.glucose_value > patientData.glucose_bounds[1]) {
                    patientDataPackage["glucose_colour"] = warning_colour
                }
                if (patientDataPackage.weight_value < patientData.weight_bounds[0] || patientDataPackage.weight_value > patientData.weight_bounds[1]) {
                    patientDataPackage["weight_colour"] = warning_colour
                }
                if (patientDataPackage.insulin_value < patientData.insulin_bounds[0] || patientDataPackage.insulin_value > patientData.insulin_bounds[1]) {
                    patientDataPackage["insulin_colour"] = warning_colour
                }
                if (patientDataPackage.exercise_value < patientData.exercise_bounds[0] || patientDataPackage.exercise_value > patientData.exercise_bounds[1]) {
                    patientDataPackage["exercise_colour"] = warning_colour
                }

                //Highlight required attributes
                if (patientData.glucose_required) {
                    patientDataPackage.glucose_value = String(patientDataPackage.glucose_value) + required_symbol;
                }
                if (patientData.weight_required) {
                    patientDataPackage.weight_value = String(patientDataPackage.weight_value) + required_symbol;
                }
                if (patientData.insulin_required) {
                    patientDataPackage.insulin_value = String(patientDataPackage.insulin_value) + required_symbol;
                }
                if (patientData.exercise_required) {
                    patientDataPackage.exercise_value = String(patientDataPackage.exercise_value) + required_symbol;
                }

                patientsLatest.push(patientDataPackage)
            }

        } else {
            // Otherwise, find and display the patients searched for
            for (i = 0; i < clinicianData.patients.length; i++) {
                patientID = clinicianData.patients[i]
                patientData = await Patient.findById(patientID).lean()
                let names = req.query.name.toLowerCase().split(' ')
                let first_name = names[0]
                let last_name
                if (names.length > 1) {
                    last_name = names[1]
                }
                if (patientData.first_name.toLowerCase() == first_name && patientData.last_name.toLowerCase() == last_name || patientData.first_name.toLowerCase() == first_name) {
                    patientDataPackage = {
                        first_name: patientData.first_name,
                        last_name: patientData.last_name,
                        patient_link: "/user/clinician/patientdetails?" + "id=" + patientID
                    }
                    if (patientData.data.length > 0) {
                        patientDataPackage.glucose_value = patientData.data[patientData.data.length - 1].glucose.value
                        patientDataPackage.weight_value = patientData.data[patientData.data.length - 1].weight.value
                        patientDataPackage.insulin_value = patientData.data[patientData.data.length - 1].insulin.value
                        patientDataPackage.exercise_value = patientData.data[patientData.data.length - 1].exercise.value
                    } else {
                        patientDataPackage.glucose_value = undefined
                        patientDataPackage.weight_value = undefined
                        patientDataPackage.insulin_value = undefined
                        patientDataPackage.exercise_value = undefined
                    }
                    //Highlight values that are outside bounds
                    if (patientDataPackage.glucose_value < patientData.glucose_bounds[0] || patientDataPackage.glucose_value > patientData.glucose_bounds[1]) {
                        patientDataPackage["glucose_colour"] = warning_colour
                    }
                    if (patientDataPackage.weight_value < patientData.weight_bounds[0] || patientDataPackage.weight_value > patientData.weight_bounds[1]) {
                        patientDataPackage["weight_colour"] = warning_colour
                    }
                    if (patientDataPackage.insulin_value < patientData.insulin_bounds[0] || patientDataPackage.insulin_value > patientData.insulin_bounds[1]) {
                        patientDataPackage["insulin_colour"] = warning_colour
                    }
                    if (patientDataPackage.exercise_value < patientData.exercise_bounds[0] || patientDataPackage.exercise_value > patientData.exercise_bounds[1]) {
                        patientDataPackage["exercise_colour"] = warning_colour
                    }
                    //Highlight required attributes
                    if (patientData.glucose_required) {
                        patientDataPackage.glucose_value = String(patientDataPackage.glucose_value) + required_symbol;
                    }
                    if (patientData.weight_required) {
                        patientDataPackage.weight_value = String(patientDataPackage.weight_value) + required_symbol;
                    }
                    if (patientData.insulin_required) {
                        patientDataPackage.insulin_value = String(patientDataPackage.insulin_value) + required_symbol;
                    }
                    if (patientData.exercise_required) {
                        patientDataPackage.exercise_value = String(patientDataPackage.exercise_value) + required_symbol;
                    }

                    patientsLatest.push(patientDataPackage)
                }
            }
            clinicianData.searchterm = req.query.name;
        }
        clinicianData["patientData"] = patientsLatest
        clinicianData["view_button_text"] = "View patient comments"
        clinicianData["date"] = today
        return res.render('clinicianDash', { layout: 'clinicianLayout', clinician: clinicianData });
    } catch (err) {
        return next(err)
    }
}

const getClinicianDashWithComments = async(req, res, next) => {
    try {
        let ClinicianID = req.user._id.toString();
        const clinicianData = await Clinician.findById(ClinicianID).lean()
        let today = new Date()
        patientsLatest = [] // Each patent has {first_name, last_name, is_not_today (* if not today, else empty), glucose_value, glucose_colour, ...}
        let i
        let patientDataPackage
        let patientData
        if (typeof(req.query.name) === 'undefined' || req.query.name === "") {
            for (i = 0; i < clinicianData.patients.length; i++) {
                patientID = clinicianData.patients[i]
                patientData = await Patient.findById(patientID).lean()

                patientDataPackage = {
                    first_name: patientData.first_name,
                    last_name: patientData.last_name,
                    patient_link: "/patientdetails",
                    glucose_value: patientData.data[patientData.data.length - 1].glucose.comment,
                    weight_value: patientData.data[patientData.data.length - 1].weight.comment,
                    insulin_value: patientData.data[patientData.data.length - 1].insulin.comment,
                    exercise_value: patientData.data[patientData.data.length - 1].exercise.comment,
                }
                patientsLatest.push(patientDataPackage)
            }
        } else {
            for (i = 0; i < clinicianData.patients.length; i++) {
                patientID = clinicianData.patients[i]
                patientData = await Patient.findById(patientID).lean()
                let names = req.query.name.toLowerCase().split(' ')
                let first_name = names[0]
                let last_name
                if (names.length > 1) {
                    last_name = names[1]
                }
                if (patientData.first_name.toLowerCase() == first_name && patientData.last_name.toLowerCase() == last_name || patientData.first_name.toLowerCase() == first_name) {
                    patientID = clinicianData.patients[i]
                    patientData = await Patient.findById(patientID).lean()

                    patientDataPackage = {
                        first_name: patientData.first_name,
                        last_name: patientData.last_name,
                        patient_link: "/patientdetails",
                        glucose_value: patientData.data[patientData.data.length - 1].glucose.comment,
                        weight_value: patientData.data[patientData.data.length - 1].weight.comment,
                        insulin_value: patientData.data[patientData.data.length - 1].insulin.comment,
                        exercise_value: patientData.data[patientData.data.length - 1].exercise.comment,
                    }
                    patientsLatest.push(patientDataPackage)
                }
            }
            clinicianData.searchterm = req.query.name;
        }
        clinicianData["patientData"] = patientsLatest
        clinicianData["view_button_text"] = "View patient data"
        clinicianData["date"] = today
        return res.render('clinicianDash', { layout: 'clinicianLayout', clinician: clinicianData });
    } catch (err) {
        return next(err)
    }
}

const getClinicianPatientDash = async(req, res, next) => {
    try {
        let ClinicianID = req.user._id.toString();
        let patient_id = req.query.id;
        let error;
        error = req.query.error;
        //Check that patient is managed by clinician
        const clinicianData = await Clinician.findById(ClinicianID).lean()
        if (clinicianData.patients.includes(patient_id)) {
            patientData = await Patient.findById(patient_id).lean()
                //format required time series data
            patientData.glucose_checked = boolToChecked(patientData.glucose_required);
            patientData.weight_checked = boolToChecked(patientData.weight_required);
            patientData.insulin_checked = boolToChecked(patientData.insulin_required);
            patientData.exercise_checked = boolToChecked(patientData.exercise_required);
            // format note
            patientData.latest_patient_note = "";
            if (patientData.notes.length > 0) {
                patientData.latest_patient_note = patientData.notes[patientData.notes.length - 1].text;
            }
            //format warning colours
            patientData.data = patientData.data.reverse(); //Display newest to oldest
            for (i = 0; i < patientData.data.length; i++) {
                if (patientData.data[i].glucose.value < patientData.glucose_bounds[0] || patientData.data[i].glucose.value > patientData.glucose_bounds[1]) {
                    patientData.data[i]["glucose_colour"] = warning_colour;
                }
                if (patientData.data[i].weight.value < patientData.weight_bounds[0] || patientData.data[i].weight.value > patientData.weight_bounds[1]) {
                    patientData.data[i]["weight_colour"] = warning_colour;
                }
                if (patientData.data[i].insulin.value < patientData.insulin_bounds[0] || patientData.data[i].insulin.value > patientData.insulin_bounds[1]) {
                    patientData.data[i]["insulin_colour"] = warning_colour;
                }
                if (patientData.data[i].exercise.value < patientData.exercise_bounds[0] || patientData.data[i].exercise.value > patientData.exercise_bounds[1]) {
                    patientData.data[i]["exercise_colour"] = warning_colour;
                }
            }
            //format Errors
            if (error == "invalidbounds") { patientData.updatePatientDataSeriesErrorMessage = "Invalid bounds provided"; }
            patientData.idqueryparam = "?id=" + patient_id;
            return res.render('clinicianPatientDash', { layout: 'clinicianLayout', patient: patientData });
        } else {
            return res.redirect("/user/clinician/")
        }
    } catch (err) {
        return next(err)
    }
}

const getClinicianPatientNotes = async(req, res, next) => {
    try {
        let ClinicianID = req.user._id.toString();
        let patient_id = req.query.id;
        //Check that patient is managed by clinician
        const clinicianData = await Clinician.findById(ClinicianID).lean()
        if (clinicianData.patients.includes(patient_id)) {
            patientData = await Patient.findById(patient_id).lean()
            patientData.idqueryparam = "?id=" + patient_id;
            patientData.patient_id = patient_id;
            patientData.notes = patientData.notes.reverse(); //Display newest to oldest
            return res.render('clinicianAddNotes', { layout: 'clinicianLayout', patient: patientData });
        } else {
            return res.redirect("/user/clinician/")
        }
    } catch (err) {
        return next(err)
    }
}

const getClinicianAddPatient = async(req, res, next) => {
    try {
        return res.render('clinicianNewPatientEntry', { layout: 'clinicianLayout' });
    } catch (err) {
        return next(err)
    }

}

//Post endpoints
const updatePatientSupportMessage = async(req, res, next) => {
    //Check that patient belongs to clinician
    let ClinicianID = req.user._id.toString();
    const clinicianData = await Clinician.findById(ClinicianID).lean()
    let patient_id = req.query.id;
    if (clinicianData.patients.includes(patient_id)) {
        let message = req.body.support_message;
        Patient.updateOne({ _id: patient_id }, {
            $push: { messages: message }
        }).exec();
    }
    return res.redirect("/user/clinician/patientdetails?id=" + patient_id)
}

const updatePatientNotes = async(req, res, next) => {
    //Check that patient belongs to clinician
    let ClinicianID = req.user._id.toString();
    const clinicianData = await Clinician.findById(ClinicianID).lean()
    let patient_id = req.query.id;
    if (clinicianData.patients.includes(patient_id)) {
        let text = req.body.new_note;
        let note = new Note({ text: text });
        await Patient.updateOne({ _id: patient_id }, {
            $push: { notes: note }
        }).exec();
    }
    return res.redirect("/user/clinician/notes?id=" + patient_id)
}

const updatePatientList = async(req, res, next) => {
    let ClinicianID = req.user._id.toString();
    if (req.body.first_name == "" || req.body.last_name == "" || req.body.username == "" || req.body.password == "" || req.body.email == "" || req.body.dob == "") {
        //Missing required data, return to home
        return res.redirect("/user/clinician/");
    }
    //Create new patient
    let newPatientData = {};
    newPatientData.first_name = req.body.first_name;
    newPatientData.last_name = req.body.last_name;
    newPatientData.user_name = req.body.username;
    newPatientData.bio = req.body.bio;
    newPatientData.password = req.body.password;
    newPatientData.email = req.body.email;
    newPatientData.dob = new Date(req.body.dob);
    //Create new patient
    newPatient = Patient(newPatientData);
    patient_id = newPatient._id.toString();
    //Update database
    newPatient.save();
    //Add to leaderboard
    leaderboard = {
        patient_id: newPatient._id.toString(),
        engagement_rate: 0,
        username: newPatient.user_name
    };
    leaderboardObj = LeaderboardEntry(leaderboard)
    leaderboardObj.save()
        //Add to clinician
    const clinicianData = await Clinician.findById(ClinicianID).lean()
    await Clinician.updateOne({ _id: ClinicianID }, {
        $push: { patients: patient_id }
    }).exec();
    return res.redirect("/user/clinician/")
}

const updatePatientDataSeries = async(req, res, next) => {
    //Check that patient belongs to clinician
    let ClinicianID = req.user._id.toString();
    const clinicianData = await Clinician.findById(ClinicianID).lean()
    let patient_id = req.query.id;
    let error = "none";
    if (clinicianData.patients.includes(patient_id)) {
        let update_fields = {
            glucose_required: checkedToBool(req.body.glucose_required),
            weight_required: checkedToBool(req.body.weight_required),
            insulin_required: checkedToBool(req.body.insulin_required),
            exercise_required: checkedToBool(req.body.exercise_required),

        };

        let glucose_bounds = [parseFloat(req.body.glucose_bounds_lower), parseFloat(req.body.glucose_bounds_upper)]
        let weight_bounds = [parseFloat(req.body.weight_bounds_lower), parseFloat(req.body.weight_bounds_upper)]
        let insulin_bounds = [parseFloat(req.body.insulin_bounds_lower), parseFloat(req.body.insulin_bounds_upper)]
        let exercise_bounds = [parseFloat(req.body.exercise_bounds_lower), parseFloat(req.body.exercise_bounds_upper)]

        //Data Validation

        if (isValidBounds(glucose_bounds[0], glucose_bounds[1])) { update_fields.glucose_bounds = glucose_bounds; } else { error = "invalidbounds"; }
        if (isValidBounds(weight_bounds[0], weight_bounds[1])) { update_fields.weight_bounds = weight_bounds; } else { error = "invalidbounds"; }
        if (isValidBounds(insulin_bounds[0], insulin_bounds[1])) { update_fields.insulin_bounds = insulin_bounds; } else { error = "invalidbounds"; }
        if (isValidBounds(exercise_bounds[0], exercise_bounds[1])) { update_fields.exercise_bounds = exercise_bounds; } else { error = "invalidbounds"; }

        //Update patient
        await Patient.updateOne({ _id: patient_id }, update_fields).exec();
    }
    return res.redirect("/user/clinician/patientdetails?id=" + patient_id + "&error=" + error)
}

module.exports = {
    getClinicianDash,
    getClinicianLogin,
    //clinicianLoginRedirect,
    clinicianLogoutRedirect,
    getClinicianDashWithComments,
    getClinicianPatientDash,
    getClinicianPatientNotes,
    getClinicianAddPatient,
    updatePatientSupportMessage,
    updatePatientDataSeries,
    updatePatientNotes,
    updatePatientList
}