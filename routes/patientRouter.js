const express = require('express');
const passport = require('passport')
const router = express.Router();
const controller = require('../controllers/patientController');

// checks if a user is logged in to stop them from accessing pages that are only meant for logged in users
const isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/user/patient/login') // if not logged in, redirects the user to the login page 
    }
    return next()
}

//Pages
router.get("/login", controller.getPatientLogin);
router.get("/", isAuthenticated, controller.getPatientDash);
router.get("/record", isAuthenticated, controller.getPatientDataEntry);
router.get("/password", isAuthenticated, controller.getPatientPasswordChange);
router.get("/logoutRedirect", isAuthenticated, controller.patientLogoutRedirect);

//Post api routes
router.post("/insertPatientData", isAuthenticated, controller.insertPatientData);
router.post("/changePassword", isAuthenticated, controller.insertPatientPassword);

// Handle login
router.post('/login',
    passport.authenticate('patient-local', {
        successRedirect: '/user/patient',
        failureRedirect: '/user/patient/login',
        failureFlash: true
    })
)

// // Handle logout
// router.post('/logout', (req, res) => {
//     req.logout()
//     res.redirect('/')
// })

module.exports = router;