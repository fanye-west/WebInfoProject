//Import Models
const res = require('express/lib/response');
const Patient = require('../models/patient');
const Value = require('../models/value');
const Data = require('../models/data');
require('../models')

var green = "background-color:#9AD3A5";
var red = "background-color:#E58783";
var orange = "background-color:#F2CA95";
var warning_colour = "#E58783"

//Deliverable 2 Hardcoded values
const PatientID = "62668042f2c4e1d37f21d7b2"
var VISITED_LOGIN = false

// utils
function isToday(date) {
    const today = new Date()
    let check = date.getDate() == today.getDate() &&
        date.getMonth() == today.getMonth() &&
        date.getFullYear() == today.getFullYear()
    return check
}

// Main functions

const getPatientLogin = async(req, res, next) => {
    try {
        return res.render('patientLogin', { layout: 'loginLayout' });
    } catch (err) {
        return next(err)
    }
}

const patientLoginRedirect = async(req, res, next) => {
    //Checks login for deliverable 2
    try {
        VISITED_LOGIN = true
        return res.redirect('/user/patient')
    } catch (err) {
        return next(err)
    }
}

const getPatientDash = async(req, res, next) => {
    try {
        //Check login for deliverable 2
        if (!VISITED_LOGIN) { return res.redirect('/user/patient/login') }
        // console.log(req.params.userId);
        const patientData = await Patient.findById(PatientID).lean()
        patientData.data = patientData.data.reverse(); //Display newest to oldest
        let i;
        for (i = 0; i < patientData.data.length; i++) {
            if (patientData.data[i].glucose.value < patientData.glucose_bounds[0] || patientData.data[i].glucose.value > patientData.glucose_bounds[1]) {
                patientData.data[i]["glucose_colour"] = warning_colour
            }
            if (patientData.data[i].weight.value < patientData.weight_bounds[0] || patientData.data[i].weight.value > patientData.weight_bounds[1]) {
                patientData.data[i]["weight_colour"] = warning_colour
            }
            if (patientData.data[i].insulin.value < patientData.insulin_bounds[0] || patientData.data[i].insulin.value > patientData.insulin_bounds[1]) {
                patientData.data[i]["insulin_colour"] = warning_colour
            }
            if (patientData.data[i].exercise.value < patientData.exercise_bounds[0] || patientData.data[i].exercise.value > patientData.exercise_bounds[1]) {
                patientData.data[i]["exercise_colour"] = warning_colour
            }

        }
        return res.render('patientDash', { layout: 'patientLayout', patient: patientData });
    } catch (err) {
        return next(err)
    }
}

const getPatientDataEntry = async(req, res, next) => {
    try {
        //Check login for deliverable 2
        if (!VISITED_LOGIN) { return res.redirect('/user/patient/login') }
        // TODO Add DB call and actual HRB render here:
        // Get patient data for today's date
        const patientData = await Patient.findById(PatientID).lean()
        let latest_data = patientData.data[patientData.data.length - 1];

        // var d = new Date();
        // d.setDate(d.getDate() - 1);
        // latest_data.date = d
        // console.log(latest_data.date)

        let glucose_value = undefined
        let weight_value = undefined
        let insulin_value = undefined
        let exercise_value = undefined

        let glucose_comment = undefined
        let weight_comment = undefined
        let insulin_comment = undefined
        let exercise_comment = undefined

        if (isToday(latest_data.date)) {
            glucose_value = latest_data.glucose.value
            weight_value = latest_data.weight.value
            insulin_value = latest_data.insulin.value
            exercise_value = latest_data.exercise.value

            glucose_comment = latest_data.glucose.comment
            weight_comment = latest_data.weight.comment
            insulin_comment = latest_data.insulin.comment
            exercise_comment = latest_data.exercise.comment
        }

        let glucose_colour = green
        let weight_colour = green
        let insulin_colour = green
        let exercise_colour = green

        let glucose_subheading = ""
        let weight_subheading = ""
        let insulin_subheading = ""
        let exercise_subheading = ""

        if (glucose_value == undefined && patientData.glucose_required) {
            glucose_colour = red
            glucose_subheading = "You still need to fill this in for today"
        } else if (glucose_value == undefined && !patientData.glucose_required) {
            glucose_colour = orange
            glucose_subheading = "Optional record"
        } else {
            glucose_colour = green
            glucose_subheading = "You have already filled this in for today"
        }

        if (weight_value == undefined && patientData.weight_required) {
            weight_colour = red
            weight_subheading = "You still need to fill this in for today"
        } else if (weight_value == undefined && !patientData.weight_required) {
            weight_colour = orange
            weight_subheading = "Optional record"
        } else {
            weight_colour = green
            weight_subheading = "You have already filled this in for today"
        }

        if (insulin_value == undefined && patientData.insulin_required) {
            insulin_colour = red
            insulin_subheading = "You still need to fill this in for today"
        } else if (insulin_value == undefined && !patientData.insulin_required) {
            insulin_colour = orange
            insulin_subheading = "Optional record"
        } else {
            insulin_colour = green
            insulin_subheading = "You have already filled this in for today"
        }

        if (exercise_value == undefined && patientData.exercise_required) {
            exercise_colour = red
            exercise_subheading = "You still need to fill this in for today"
        } else if (exercise_value == undefined && !patientData.exercise_required) {
            exercise_colour = orange
            exercise_subheading = "Optional record"
        } else {
            exercise_colour = green
            exercise_subheading = "You have already filled this in for today"
        }

        patentExistingRecordData = {
            glucose_value: glucose_value,
            weight_value: weight_value,
            insulin_value: insulin_value,
            exercise_value: exercise_value,
            glucose_comment: glucose_comment,
            weight_comment: weight_comment,
            insulin_comment: insulin_comment,
            exercise_comment: exercise_comment,
            glucose_colour: glucose_colour,
            weight_colour: weight_colour,
            insulin_colour: insulin_colour,
            exercise_colour: exercise_colour,
            glucose_subheading: glucose_subheading,
            weight_subheading: weight_subheading,
            insulin_subheading: insulin_subheading,
            exercise_subheading: exercise_subheading
        }
        return res.render('patientDataEntry', { layout: 'patientLayout', patient: patentExistingRecordData });
        // return res.render('patientDash', { layout: 'patientLayout', patient: patientData });
    } catch (err) {
        return next(err)
    }
}

const insertPatientData = async(req, res, next) => {
    //Expects data from a form with the following fields:
    // REQUIRED
    // 		patient_id: unique patient ID
    // OPIONAL:
    // 		blood_glucose_value: Numerical value for blood glucose 
    // 		blood_glucose_comment: Free text comment for blood glucose 
    // 		insulin_dose_value: Numerical value for insulin doses
    // 		insulin_dose_comment: Free text comment for insulin doses
    // 		weight_value: Numerical value for weight in kg
    // 		weight_comment: Free text comment for weight
    // 		steps_value: Numerical value for steps
    // 		steps_comment: Free text comment for steps
    //Test with $ curl -X POST http://127.0.0.1:3000/user/patient/addpatientdata
    try {
        const requestData = req.body;
        //Check data 
        //Numerical
        let blood_glucose_value = parseFloat(req.body.blood_glucose_value)
        let weight_value = parseFloat(req.body.weight_value)
        let insulin_dose_value = parseFloat(req.body.insulin_dose_value)
        let daily_steps_value = parseFloat(req.body.daily_steps_value)
            //Free text
        let blood_glucose_comment = req.body.blood_glucose_comment
        let weight_comment = req.body.weight_comment
        let insulin_dose_comment = req.body.insulin_dose_comment
        let daily_steps_comment = req.body.daily_steps_comment
            //Check current day's data from db, merge in new data where reuired
            // IF current day not in DB:
            //      Create new data object (as below)
            // ELSE current day in DB
            //      If data exists, overwrite that data pointe
            //      Else, add data point (these are really the same actions...)
            //      Unless new data is empty and existing is non-empty, then dont overwite
            //      Update DB as to not duplicate the day of data (one entry ber 24h UCT+10:00 block)

        //Create new data objects
        glucose = new Value({
            is_recorded: true,
            value: blood_glucose_value,
            comment: blood_glucose_comment,
        })
        weight = new Value({
            is_recorded: true,
            value: weight_value,
            comment: weight_comment,
        })
        insulin = new Value({
            is_recorded: true,
            value: insulin_dose_value,
            comment: insulin_dose_comment,
        })
        exercise = new Value({
            is_recorded: true,
            value: daily_steps_value,
            comment: daily_steps_comment,
        })
        newdata = new Data({
            glucose: glucose,
            weight: weight,
            insulin: insulin,
            exercise: exercise
        })
        Patient.updateOne({ _id: PatientID }, {
            $push: { data: newdata }
        }).exec();

        return res.redirect('/user/patient')
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    getPatientLogin,
    patientLoginRedirect,
    getPatientDash,
    getPatientDataEntry,
    insertPatientData,
}