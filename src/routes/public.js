//Defines routes associated with the about /public/ about pages

const express = require('express');
const path = require('path');
const router = express.Router();

router.get("/about-diabetes", function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'gui', 'public', 'about-diabetes.html'));
});

router.get("/about-this-website", function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'gui', 'public', 'about-this-website.html'));
});

module.exports = router;