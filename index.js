//This will eventually hold our root server code in node.js, to run on heroku
//Imports
var createError = require('http-errors');
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars') // include handlebars

require('./models')

//Constants
const app = express();
const port = 3000;

//Ensure static files are available
app.use(express.static(__dirname + '/gui'));

//Define route files 
var indexRouter = require('./routes/indexRouter');
var publicStaticRouter = require('./routes/public');
var patientRouter = require('./routes/patientRouter.js');
var clinitianRouter = require('./routes/clinitianRouter.js');

//Define how URLs map to routes
app.use('/', indexRouter);
app.use('/public', publicStaticRouter);
app.use('/user/patient', patientRouter);
app.use('/user/clinician', clinitianRouter);

// catch HTTP Errors
app.use(function(req, res, next) {
    //More logic can be added here to determine the cause of the error, eg 401 unauthenticated for non-logged in users
    next(createError(404, "Not Found"));
});

// error handler
app.use(function(err, req, res, next) {
    // Based on error type, take the appropriate action
    if (err.message == "Not Found") { res.sendFile(path.join(__dirname, 'gui', 'public', '404.html')) }
});

// configure Handlebars 
app.engine('hbs', exphbs.engine({
    defaultlayout: "main",
    extname: 'hbs',
    helpers: require('./config/helpers')
}))
app.set('view engine', 'hbs') // set Handlebars view engine

// Set up to handle POST requests
app.use(express.json()) // needed if POST data is in JSON format

//Listen
app.listen(process.env.PORT || 3000, () => {
    console.log('App is running')
})