const express = require('express');
const router = express.Router();
const controller = require('../controllers/clinicianController');

router.get("/", controller.getClinicianDash);

module.exports = router;