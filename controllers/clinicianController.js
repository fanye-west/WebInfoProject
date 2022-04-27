//Import Models
const res = require('express/lib/response');
const Clinician = require('../models/clinician');
const Patient = require('../models/patient');
const Value = require('../models/value');
const Data = require('../models/data');
require('../models')

var warning_colour = "#E58783"

//Deliverable 2 Hardcoded values
const ClinicianID = "6269533c9517b0335cd37f71"
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
        console.log(clinicianData)

        let today = new Date()

        patients_latest = [] // Each patent has {first_name, last_name, is_not_today (* if not today, else empty), glucose_value, glucose_colour, ...}
        let i
        let patientDataPackage
        let patientData
        for (i = 0; i < clinicianData.patients.length; i++) {
            console.log(clinicianData.patients[i].first_name)
            patientDataPackage = {
                first_name: clinicianData.patients[i].first_name,
                last_name: clinicianData.patients[i].last_name,
            }
            patientID = clinicianData.patients[i]._id.Value
            console.log(patientID)
            patientData = await Patient.findById(patientID).lean()
            console.log(patientData)
            patientDataPackage["glucose_value"] = patientData.data[patientData.Data.length - 1]

        }

        // dashData = {
        //         first_name: first_name,
        //         last_name: last_name,
        //         date: today,
        //         patients_latest: patients_latest
        //     }
        return res.render('clinicianDash', { layout: 'clinicianLayout' });
    } catch (err) {
        return next(err)
    }
}



module.exports = {
    getClinicianDash,
    getClinicianLogin,
    clinicianLoginRedirect,
}