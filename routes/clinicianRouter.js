const express = require('express');
const passport = require('passport')
const router = express.Router();
const controller = require('../controllers/clinicianController');

const isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/user/clinician/login')
    }
    return next()
}

router.get("/login", controller.getClinicianLogin);
router.get("/", isAuthenticated, controller.getClinicianDash);
router.get("/comments", isAuthenticated, controller.getClinicianDashWithComments);
router.get("/patientdetails", isAuthenticated, controller.getClinicianPatientDash);
router.get("/notes", isAuthenticated, controller.getClinicianPatientNotes);
router.get("/newpatient", isAuthenticated, controller.getClinicianAddPatient);
router.get("/logoutRedirect", isAuthenticated, controller.clinicianLogoutRedirect);

router.post("/updatePatientSupportMessage", isAuthenticated, controller.updatePatientSupportMessage);
router.post("/insertNote", isAuthenticated, controller.updatePatientNotes);
router.post("/updatePatientDataSeries", isAuthenticated, controller.updatePatientDataSeries);
router.post("/insertNewPatient", isAuthenticated, controller.updatePatientList);

router.post('/login',
    passport.authenticate('clinician-local', {
        successRedirect: '/user/clinician',
        failureRedirect: '/user/clinician/login',
        failureFlash: true
    })
)

// Handle logout
router.post('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})


module.exports = router;