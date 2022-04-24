const express = require('express');
const router = express.Router();
const controller = require('../controllers/patientController');

//Pages
router.get("/", controller.getPatientDash);
router.get("/record", controller.getPatientDataEntry);

//Post api routes
router.post("/insertPatientData", controller.insertPatientData);

module.exports = router;