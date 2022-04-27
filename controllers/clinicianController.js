//Import Models
const res = require('express/lib/response');
const Patient = require('../models/patient');
const Value = require('../models/value');
const Data = require('../models/data');
require('../models')

var warning_colour = "#E58783"

//Deliverable 2 Hardcoded values
const ClinicianID = "62668042f2c4e1d37f21d7b2"

//Utils
function isToday(date) {
    const today = new Date()
    let check = date.getDate() == today.getDate() &&
        date.getMonth() == today.getMonth() &&
        date.getFullYear() == today.getFullYear()
    return check
}

const getClinicianDash = async(req, res, next) => {

    try {
        // TODO Add DB call and actual HRB render here, eg:
        const clinicianData = await Patient.findById(PatientID).lean()

        let today = new Date()

        patients_latest = [] // Each patent has {first_name, last_name, is_not_today (* if not today, else empty), glucose_value, glucose_colour, ...}

        dashData = {
            first_name: first_name,
            last_name: last_name,
            date: today,
            patients_latest: patients_latest
        }
        return res.render('clinicianDash');
    } catch (err) {
        return next(err)
    }
}



module.exports = {
    getClinicianDash,
}