const express = require('express');
const router = express.Router();
const controller = require('../controllers/clinicianController');

router.get("/", controller.getClinicianDash);
router.get("/login", controller.getClinicianLogin);
router.get("/loginRedirect", controller.clinicianLoginRedirect);

module.exports = router;