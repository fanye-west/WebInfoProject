//Import Models
// TODO add models
const res = require('express/lib/response');
const Patient = require('../models/patient');

const mock_patient = require('../models/mock_patient.js')

const getPatientDash = async(req, res, next) => {
    try {
        // TODO Add DB call and actual HRB render here, eg:
        const patientData = await Patient.find().lean()
        console.log(patientData);

        return res.render('patientDash', { layout: 'patientLayout', patient: patientData });
    } catch (err) {
        return next(err)
    }
}

const getPatientDataEntry = async(req, res, next) => {
    try {
        // TODO Add DB call and actual HRB render here, eg:
        // const patientData = await ....
        // return res.render('patientDash', { data: ... });
        return res.render('patientDataEntry', { layout: 'patientLayout' });
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
        //return res.redirect('/user/patient')
        const requestData = req.body;

        // Perform actions here
        console.log(requestData);

        res.send('success');
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    getPatientDash,
    getPatientDataEntry,
    insertPatientData,
}