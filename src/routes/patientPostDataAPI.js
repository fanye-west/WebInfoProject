const express = require('express');
const path = require('path');
const router = express.Router();

router.post('/addpatientdata', function(req, res) {
    //Test with $ curl -X POST http://127.0.0.1:3000/api/addpatientdata
    const requestData = req.body;

    // Perform actions here
    console.log(requestData);

    res.send('success');
});

//GET endpoint 
router.get('/addpatientdata', function(req, res) {
    res.send('/api/addpatientdata is a POST only endpoint');
});

module.exports = router;