var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var router = require('./routes');
var serverConfig = require('./config/server.config');
var mongoose = require('mongoose');
//var mongodb = require('mongodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true, colorize: true}));

app.use('/public', express.static(path.join(__dirname, '../public'))); //Make public folder public accessible

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    //res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/api', router());


/*var db;
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    // Save database object from the callback for reuse.
    db = database;
    console.log("Database connection ready");

    // Initialize the app.
    var server = app.listen(process.env.PORT || serverConfig.PORT, function () {
        var port = server.address().port;
        console.log("App now running on port", port);
    });
});
*/

if (mongoose.connection.readyState === 0) {
  mongoose.connect('mongodb://localhost/orbit', function (err) {
    if (err) console.log(err);
  });
};

var server_port = process.env.PORT || serverConfig.PORT;
app.listen(server_port, function () {
  console.log('Example app listening on port ' + server_port + '!')
})
