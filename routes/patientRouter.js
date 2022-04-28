const express = require('express');
const router = express.Router();
const controller = require('../controllers/patientController');

//Pages
router.get("/", controller.getPatientDash);
router.get("/record", controller.getPatientDataEntry);
router.get("/login", controller.getPatientLogin);
router.get("/loginRedirect", controller.patientLoginRedirect);
router.get("/logoutRedirect", controller.patientLogoutRedirect);

//Post api routes
router.post("/insertPatientData", controller.insertPatientData);

module.exports = router;