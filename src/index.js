//This will eventually hold our root server code in node.js, to run on heroku

const express = require('express');

const app = express();
const port = 3000;

//Define route files 
var indexRouter = require('./routes/index');
var publicStaticRouter = require('./routes/public');

// app.get('/', function(req, res) {
//     res.send('Hello World!');
// });

//Define how URLs map to routes
app.use('/', indexRouter);
app.use('/', publicStaticRouter);

app.listen(port, function() {
    console.log(`App listening on port ${port}`);
});