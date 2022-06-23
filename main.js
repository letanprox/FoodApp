const express = require('express');
const bodyParser = require('body-parser');

const path = require('path');
const fs = require('fs');
const formidableMiddleware = require('express-formidable');


// create express app
const app = express();

// setup the server port
const port = process.env.PORT || 4000;

//config param
app.use(bodyParser.json());


// define root route
app.get('/', (req, res)=>{
    res.send('API FOOD APP');
});


// import routes
const androidRounte = require('./Routes/Android.js');
const webRounte = require('./Routes/Web.js');


// // create routes
app.use('/api/', androidRounte);

app.use(formidableMiddleware());
app.use('/api/w1/', webRounte);


app.get('/public/:version', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Build file path
    let filePath = path.join(
      __dirname,
      req.url === "/" ? "index.html" : req.url
    );
  
    // Extension of file
    let extname = path.extname(filePath);
  
    // Initial content type
    let contentType = "text/html";
  
    // Check ext and set content type
    switch (extname) {
      case ".js":
        contentType = "text/javascript";
        break;
      case ".css":
        contentType = "text/css";
        break;
      case ".json":
        contentType = "application/json";
        break;
      case ".png":
        contentType = "image/png";
        break;
      case ".jpg":
        contentType = "image/jpg";
        break;
    }
  
    // Check if contentType is text/html but no .html file extension
    if (contentType == "text/html" && extname == "") filePath += ".html";
  
    // log the filePath
    console.log(filePath);
  
    // Read File
    fs.readFile(filePath, (err, content) => {
      if (err) {
        if (err.code == "ENOENT") {
          // Page not found
          fs.readFile(
            path.join(__dirname, "public", "404.html"),
            (err, content) => {
              res.writeHead(404, { "Content-Type": "text/html" });
              res.end(content, "utf8");
            }
          );
        } else {
          //  Some server error
          res.writeHead(500);
          res.end(`Server Error: ${err.code}`);
        }
      } else {
        // Success
        res.writeHead(200, { "Content-Type": contentType });
        res.end(content, "utf8");
      }
    });
  });

// listen to the port
app.listen(port, ()=>{
    console.log(`Express is running at port ${port}`);
});