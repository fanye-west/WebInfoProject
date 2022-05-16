//Import Models
const res = require('express/lib/response');
const Patient = require('../models/patient');
const Value = require('../models/value');
const Data = require('../models/data');
const LeaderboardEntry = require('../models/leaderboardentry.js');
const { type } = require('express/lib/response');
require('../models')

var green = "background-color:#9AD3A5";
var red = "background-color:#E58783";
var orange = "background-color:#F2CA95";
var warning_colour = "#FAC8C5"

//Deliverable 2 Hardcoded values
const PatientID = "628085734fe82f14cb55d00e" //SEEDED PATIENTS ID: "6275ca17e6f40fa90c6882b4"
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

const patientLogoutRedirect = async(req, res, next) => {
    //Checks logout for deliverable 2
    try {
        VISITED_LOGIN = false
        return res.redirect('/')
    } catch (err) {
        return next(err)
    }
}

const getPatientDash = async(req, res, next) => {
    try {
        //Check login for deliverable 2
        if (!VISITED_LOGIN) { return res.redirect('/user/patient/login') }
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
        //Get leaderboard
        //Get the top 5 items as ranked by engagement_rate without filtering
        const leaderboardData = await LeaderboardEntry.find().sort({ engagement_rate: -1 }).limit(5).lean();
        leaderboard = []
        for (i = 0; i < 5; i++) {
            leaderboard.push({ position: i + 1, name: leaderboardData[i].username, engagement_rate: Math.round(leaderboardData[i].engagement_rate) + "%" })
        }
        patientData.leaderboard = leaderboard;
        patientData.message = patientData.messages[patientData.messages.length - 1];
        //Render page
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

        let glucose_value = undefined
        let weight_value = undefined
        let insulin_value = undefined
        let exercise_value = undefined

        let glucose_comment = undefined
        let weight_comment = undefined
        let insulin_comment = undefined
        let exercise_comment = undefined

        let glucose_recorded = false
        let weight_recorded = false
        let insulin_recorded = false
        let exercise_recorded = false

        if (patientData.data.length > 0) {
            let latest_data = patientData.data[patientData.data.length - 1];
            if (isToday(latest_data.date)) {
                glucose_value = latest_data.glucose.value
                weight_value = latest_data.weight.value
                insulin_value = latest_data.insulin.value
                exercise_value = latest_data.exercise.value

                glucose_comment = latest_data.glucose.comment
                weight_comment = latest_data.weight.comment
                insulin_comment = latest_data.insulin.comment
                exercise_comment = latest_data.exercise.comment

                glucose_recorded = latest_data.glucose.is_recorded
                weight_recorded = latest_data.weight.is_recorded
                insulin_recorded = latest_data.insulin.is_recorded
                exercise_recorded = latest_data.exercise.is_recorded
            }
        }

        let glucose_colour = green
        let weight_colour = green
        let insulin_colour = green
        let exercise_colour = green

        let glucose_subheading = ""
        let weight_subheading = ""
        let insulin_subheading = ""
        let exercise_subheading = ""

        let glucose_readonly = ""
        let weight_readonly = ""
        let insulin_readonly = ""
        let exercise_readonly = ""

        if (!glucose_recorded && patientData.glucose_required) {
            glucose_colour = red
            glucose_subheading = "You still need to fill this in for today"
        } else if (!glucose_recorded && !patientData.glucose_required) {
            glucose_colour = orange
            glucose_subheading = "Optional record"
        } else {
            glucose_colour = green
            glucose_subheading = "You have already filled this in for today"
            glucose_readonly = "readonly"
        }

        if (!weight_recorded && patientData.weight_required) {
            weight_colour = red
            weight_subheading = "You still need to fill this in for today"
        } else if (!weight_recorded && !patientData.weight_required) {
            weight_colour = orange
            weight_subheading = "Optional record"
        } else {
            weight_colour = green
            weight_subheading = "You have already filled this in for today"
            weight_readonly = "readonly"
        }

        if (!insulin_recorded && patientData.insulin_required) {
            insulin_colour = red
            insulin_subheading = "You still need to fill this in for today"
        } else if (!insulin_recorded && !patientData.insulin_required) {
            insulin_colour = orange
            insulin_subheading = "Optional record"
        } else {
            insulin_colour = green
            insulin_subheading = "You have already filled this in for today"
            insulin_readonly = "readonly"
        }

        if (!exercise_recorded && patientData.exercise_required) {
            exercise_colour = red
            exercise_subheading = "You still need to fill this in for today"
        } else if (!exercise_recorded && !patientData.exercise_required) {
            exercise_colour = orange
            exercise_subheading = "Optional record"
        } else {
            exercise_colour = green
            exercise_subheading = "You have already filled this in for today"
            exercise_readonly = "readonly"
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
            exercise_subheading: exercise_subheading,
            glucose_readonly: glucose_readonly,
            weight_readonly: weight_readonly,
            insulin_readonly: insulin_readonly,
            exercise_readonly: exercise_readonly
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

        const patientData = await Patient.findById(PatientID).lean()
        let create_new_data_day = false;
        let empty_form = false;

        if (patientData.data.length > 0) {
            let latest_data = patientData.data[patientData.data.length - 1];
            if (isToday(latest_data.date)) {
                //Create new data objects
                let newdata = patientData.data
                if (!isNaN(blood_glucose_value)) {
                    newdata[newdata.length - 1].glucose.value = blood_glucose_value
                    newdata[newdata.length - 1].glucose.is_recorded = true
                }
                newdata[newdata.length - 1].glucose.comment = blood_glucose_comment

                if (!isNaN(weight_value)) {
                    newdata[newdata.length - 1].weight.value = weight_value
                    newdata[newdata.length - 1].weight.is_recorded = true
                }
                newdata[newdata.length - 1].weight.comment = weight_comment

                if (!isNaN(insulin_dose_value)) {
                    newdata[newdata.length - 1].insulin.value = insulin_dose_value
                    newdata[newdata.length - 1].insulin.is_recorded = true
                }
                newdata[newdata.length - 1].insulin.comment = insulin_dose_comment

                if (!isNaN(daily_steps_value)) {
                    newdata[newdata.length - 1].exercise.value = daily_steps_value
                    newdata[newdata.length - 1].exercise.is_recorded = true
                }
                newdata[newdata.length - 1].exercise.comment = daily_steps_comment

                num_required = patientData.glucose_required + patientData.weight_required + patientData.insulin_required + patientData.exercise_required;
                num_required_provided = (patientData.glucose_required && !isNaN(blood_glucose_value)) + (patientData.weight_required && !isNaN(weight_value)) + (patientData.insulin_required && !isNaN(insulin_dose_value)) + (patientData.exercise_required && !isNaN(daily_steps_value));
                newdata[newdata.length - 1].num_required = num_required
                newdata[newdata.length - 1].num_required_provided = num_required_provided

                await Patient.updateOne({ _id: PatientID }, { data: newdata }).exec();
            } else {
                //Data exists but is not from today, create new day
                create_new_data_day = true
            }
        } else {
            //No data exists, create new day
            create_new_data_day = true
        }
        empty_form = (isNaN(blood_glucose_value) && isNaN(weight_value) && isNaN(insulin_dose_value) && isNaN(daily_steps_value) && blood_glucose_comment == "" && weight_comment == "" && insulin_dose_comment == "" && daily_steps_comment == "")
        if (create_new_data_day && !empty_form) {
            //Create new data objects, based on whether or not a value was provided
            if (isNaN(blood_glucose_value)) {
                glucose = new Value({
                    is_recorded: false,
                    value: undefined,
                    comment: blood_glucose_comment,
                })
            } else {
                glucose = new Value({
                    is_recorded: true,
                    value: blood_glucose_value,
                    comment: blood_glucose_comment,
                })
            }
            if (isNaN(weight_value)) {
                weight = new Value({
                    is_recorded: false,
                    value: undefined,
                    comment: weight_comment,
                })
            } else {
                weight = new Value({
                    is_recorded: true,
                    value: weight_value,
                    comment: weight_comment,
                })
            }
            if (isNaN(insulin_dose_value)) {
                insulin = new Value({
                    is_recorded: false,
                    value: undefined,
                    comment: insulin_dose_comment,
                })
            } else {
                insulin = new Value({
                    is_recorded: true,
                    value: insulin_dose_value,
                    comment: insulin_dose_comment,
                })
            }
            if (isNaN(daily_steps_value)) {
                exercise = new Value({
                    is_recorded: false,
                    value: undefined,
                    comment: daily_steps_comment,
                })
            } else {
                exercise = new Value({
                    is_recorded: true,
                    value: daily_steps_value,
                    comment: daily_steps_comment,
                })
            }
            num_required = patientData.glucose_required + patientData.weight_required + patientData.insulin_required + patientData.exercise_required;
            num_required_provided = (patientData.glucose_required && !isNaN(blood_glucose_value)) + (patientData.weight_required && !isNaN(weight_value)) + (patientData.insulin_required && !isNaN(insulin_dose_value)) + (patientData.exercise_required && !isNaN(daily_steps_value));
            newdata = new Data({
                glucose: glucose,
                weight: weight,
                insulin: insulin,
                exercise: exercise,
                num_required: num_required,
                num_required_provided: num_required_provided
            })
            await Patient.updateOne({ _id: PatientID }, {
                $push: { data: newdata }
            }, { upsert: true }).exec();
        }
        //Update engagement rate: "Engagement rate is the percentage of data entries 
        //that were carried out as requested by the patient’s clinician."
        //1) count number of missed records in days where at least 1 data point was provided
        let total_required = 0;
        let total_required_provided = 0;
        for (let i = 0; i < patientData.data.length; i++) {
            total_required = total_required + patientData.data[i].num_required;
            total_required_provided = total_required_provided + patientData.data[i].num_required_provided;
        }
        //2) count number of missed days
        let first_day = patientData.data[0].date;
        let today = new Date();
        let numdays = Math.ceil((today - first_day) / (1000 * 3600 * 24))
        let missed_days = numdays - patientData.data.length;
        num_required = patientData.glucose_required + patientData.weight_required + patientData.insulin_required + patientData.exercise_required;
        total_required = total_required + (missed_days * num_required); //Extrapolate based on today's required time series
        //Update engagement_rate
        engagement_rate_calculated = 100.0 * total_required_provided / total_required;
        LeaderboardEntry.updateOne({ patient_id: PatientID }, {
            patient_id: PatientID,
            engagement_rate: engagement_rate_calculated,
            username: patientData.user_name
        }, { upsert: true }).exec();

        return res.redirect('/user/patient')
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    getPatientLogin,
    patientLoginRedirect,
    patientLogoutRedirect,
    getPatientDash,
    getPatientDataEntry,
    insertPatientData,
}