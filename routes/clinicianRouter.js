const express = require('express');
const router = express.Router();
const controller = require('../controllers/clinicianController');

router.get("/", controller.getClinicianDash);
router.get("/comments", controller.getClinicianDashWithComments);
router.get("/patientdetails", controller.getClinicianPatientDash)
router.get("/notes", controller.getClinicianPatientNotes)
router.get("/newpatient", controller.getClinicianAddPatient)

router.get("/login", controller.getClinicianLogin);
router.get("/loginRedirect", controller.clinicianLoginRedirect);
router.get("/logoutRedirect", controller.clinicianLogoutRedirect)

router.post("/updatePatientSupportMessage", controller.updatePatientSupportMessage)
router.post("/insertNote", controller.updatePatientNotes)
router.post("/updatePatientDataSeries", controller.updatePatientDataSeries)

module.exports = router;