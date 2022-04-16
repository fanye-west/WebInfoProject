# Routes
Backend JS files that define the webiste routes and API routes are stored in this location for reference by index.js.

Files should be limited to single routes or component level functionality, such as a group of website pages, or a group of related APIs. 

Once a route has been defined in a .js file here, it can be referenced in ```index.js``` in the below pattern:
```
var filenameRouter = require('./routes/filename');
app.use('/route/to/root', filenameRouter);
```