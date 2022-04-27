//Import Models
const res = require('express/lib/response');
const Patient = require('../models/patient');
const Value = require('../models/value');
const Data = require('../models/data');
require('../models')

var warning_colour = "#E58783"

//Deliverable 2 Hardcoded values
const ClinicianID = "62668042f2c4e1d37f21d7b2"
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
        // const clinicianData = await Patient.findById(PatientID).lean()

        // let today = new Date()

        // patients_latest = [] // Each patent has {first_name, last_name, is_not_today (* if not today, else empty), glucose_value, glucose_colour, ...}

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