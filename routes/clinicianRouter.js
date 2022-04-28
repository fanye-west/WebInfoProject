const express = require('express');
const router = express.Router();
const controller = require('../controllers/clinicianController');

router.get("/", controller.getClinicianDash);
router.get("/login", controller.getClinicianLogin);
router.get("/loginRedirect", controller.clinicianLoginRedirect);
router.get("/logoutRedirect", controller.clinicianLogoutRedirect)

module.exports = router;