//This will eventually hold our root server code in node.js, to run on heroku

const express = require("express");
const routes = require("./server/routes");

// App
const app = express();

// Set port
const port = process.env.PORT || "8888";
app.set("port", port);

app.use('/', routes);

// Server
app.listen(port, () => console.log(`Server running on localhost:${port}`));