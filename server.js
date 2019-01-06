var express = require('express');
var path = require('path');
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json(), function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/doc-search'));

app.get('*', function(req,res) {

res.sendFile(path.join(__dirname+'/dist/doc-search/index.html'));
});

// Start the app by listening on the default Heroku port
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
    console.log("App now running on port", port);
});
