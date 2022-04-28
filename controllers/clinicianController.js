//Import Models
const res = require('express/lib/response');
const Clinician = require('../models/clinician');
const Patient = require('../models/patient');
const Value = require('../models/value');
const Data = require('../models/data');
require('../models')

var warning_colour = "#FAC8C5"

//Deliverable 2 Hardcoded values
const ClinicianID = "626a6639ce600ec9408c8abf" //SEEDED CLINICIAN: "626a6639ce600ec9408c8abf", manages patient "626a6639ce600ec9408c8abe"
var VISITED_LOGIN = false

//Utils
function isToday(date) {
    const today = new Date()
    let check = date.getDate() == today.getDate() &&
        date.getMonth() == today.getMonth() &&
        date.getFullYear() == today.getFullYear()
    return check
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
    try {
        VISITED_LOGIN = true
        return res.redirect('/user/clinician')
    } catch (err) {
        return next(err)
    }
}

const getClinicianDash = async(req, res, next) => {
    try {
        //Check login for deliverable 2
        if (!VISITED_LOGIN) { return res.redirect('/user/clinician/login') }
        const clinicianData = await Clinician.findById(ClinicianID).lean()

        let today = new Date()

        patientsLatest = [] // Each patent has {first_name, last_name, is_not_today (* if not today, else empty), glucose_value, glucose_colour, ...}
        let i
        let patientDataPackage
        let patientData
        for (i = 0; i < clinicianData.patients.length; i++) {
            patientID = clinicianData.patients[i]
            patientData = await Patient.findById(patientID).lean()

            patientDataPackage = {
                first_name: patientData.first_name,
                last_name: patientData.last_name,
                glucose_value: patientData.data[patientData.data.length - 1].glucose.value,
                weight_value: patientData.data[patientData.data.length - 1].weight.value,
                insulin_value: patientData.data[patientData.data.length - 1].insulin.value,
                exercise_value: patientData.data[patientData.data.length - 1].exercise.value,
            }

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
            patientsLatest.push(patientDataPackage)
        }
        clinicianData["patientData"] = patientsLatest
        return res.render('clinicianDash', { layout: 'clinicianLayout', clinician: clinicianData });
    } catch (err) {
        return next(err)
    }
}



module.exports = {
    getClinicianDash,
    getClinicianLogin,
    clinicianLoginRedirect,
}