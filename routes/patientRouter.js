const express = require('express');
const passport = require('passport')
const router = express.Router();
const controller = require('../controllers/patientController');

// Authentication middleware
const isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/user/patient/login')
    }
    return next()
}

//Pages
router.get("/login", controller.getPatientLogin);
router.get("/", isAuthenticated, controller.getPatientDash);
router.get("/record", isAuthenticated, controller.getPatientDataEntry);
router.get("/password", isAuthenticated, controller.getPatientPasswordChange);

// router.get("/loginRedirect", controller.patientLoginRedirect);
// router.get("/logoutRedirect", controller.patientLogoutRedirect);

//Post api routes
router.post("/insertPatientData", isAuthenticated, controller.insertPatientData);
router.post("/insertPatientData", isAuthenticated, controller.insertPatientPassport);

// Handle login
router.post('/login',
        passport.authenticate('local', {
            successRedirect: '/user/patient/',
            failureRedirect: '/user/patient/login',
            failureFlash: true
        })
    )
    // Handle logout
router.post('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

module.exports = router;