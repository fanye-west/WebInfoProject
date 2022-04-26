//Import Models
// TODO add models
const res = require('express/lib/response');
const Patient = require('../models/patient');
const Value = require('../models/value');
const Data = require('../models/data');
require('../models')

const mock_patient = require('../models/mock_patient.js')

//Deliverable 2 Hardcoded values
const PatientID = "62668042f2c4e1d37f21d7b2"

const getPatientDash = async(req, res, next) => {
    try {
        // TODO Add DB call and actual HRB render here, eg:
        console.log(req.params.userId);
        const patientData = await Patient.findById(PatientID).lean()
        return res.render('patientDash', { layout: 'patientLayout', patient: patientData });
    } catch (err) {
        return next(err)
    }
}

const getPatientDataEntry = async(req, res, next) => {
    try {
        // TODO Add DB call and actual HRB render here:
        const patientData = await Patient.findById(PatientID).lean()

        return res.render('patientDataEntry', { layout: 'patientLayout', patient: patientData });
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
        //newAuthor = new Author(req.body)
        //await newAuthor.save()
        const requestData = req.body;
        console.log(requestData);
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
        console.log(newdata);
        Patient.updateOne({ _id: PatientID }, {
            $push: { data: newdata }
        }).exec();

        return res.redirect('/user/patient')
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    getPatientDash,
    getPatientDataEntry,
    insertPatientData,
}