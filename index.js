//This will eventually hold our root server code in node.js, to run on heroku
//Imports
var createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const exphbs = require('express-handlebars') // include handlebars
const flash = require('express-flash')
const session = require('express-session')

require('./models')

//Constants
const app = express();
const port = 3000;

//Ensure static files are available
app.use(express.static(__dirname + '/gui'));

app.use(flash())

//Use body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// Track authenticated users through login sessions
app.use(
    session({
        // The secret used to sign session cookies (ADD ENV VAR)
        secret: process.env.SESSION_SECRET || 'keyboard cat',
        name: 'demo', // The cookie name (CHANGE THIS)
        saveUninitialized: false,
        resave: false,
        cookie: {
            sameSite: 'strict',
            httpOnly: true,
            secure: app.get('env') === 'production'
        },
    })
)

if (app.get('env') === 'production') {
    app.set('trust proxy', 1); // Trust first proxy
}
// Initialise Passport.js
const passport = require('./config/passport')
app.use(passport.authenticate('session'))
    // Load authentication router

//Define route files 
var indexRouter = require('./routes/indexRouter');
var publicStaticRouter = require('./routes/public');
var patientRouter = require('./routes/patientRouter.js');
var clinicianRouter = require('./routes/clinicianRouter.js');

//Define how URLs map to routes
app.use('/', indexRouter);
app.use('/public', publicStaticRouter);
app.use('/user/patient', patientRouter);
app.use('/user/clinician', clinicianRouter);

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