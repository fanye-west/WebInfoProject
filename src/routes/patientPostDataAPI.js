const express = require('express');
const path = require('path');
const router = express.Router();

router.post('/addpatientdata', function(req, res) {
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
    //Test with $ curl -X POST http://127.0.0.1:3000/api/addpatientdata
    const requestData = req.body;

    // Perform actions here
    console.log(requestData);

    res.send('success');
});

//GET endpoint 
router.get('/addpatientdata', function(req, res) {
    res.send('/api/addpatientdata is a POST only endpoint');
});

module.exports = router;