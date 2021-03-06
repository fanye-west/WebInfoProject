//Defines route for the home page

const express = require('express');
const path = require('path');
const router = express.Router();

router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'gui', 'index.html'));
});

module.exports = router;