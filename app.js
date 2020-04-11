var express = require('express');
var routes = require('./routes');
var mongoose = require('mongoose');
var cors = require('cors')
var app = express();

// Database connection
var mongoUrl = "mongodb://localhost:27017";
mongoose.connect(mongoUrl, function (err, connect) {
    if (err) {
        console.log("Error in connecting to mongodb", err);
    } else {
        console.log("Connected to database");
    }
});

app.use(cors());

// Including routes
app.use(routes);

app.post('/read-files', function (req, res) {
    var fs = require('fs');
    var async = require('async');
    var files = req.body.files;
    var allContent = "";
    async.eachSeries(files, function (filename, cb) {
        fs.readFile("./files/" + filename, function (err, content) {
            allContent += " " + content;
            console.log("Content of file");
            if (!err) {
                cb();
            } else {
                res.send({ message: 'Error in reading file' + count, detail: err });
            }

        });
    }, function () {
        res.send({ message: 'All files have been read', content: allContent.toString().trim()});
    });
});


app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});
var server = app.listen(process.env.PORT || 3007, function () {
    console.log('Server is listening....');
});

var io = require('socket.io')(server);

io.on('connection', function(){
    setTimeout(function(){
        io.emit('datareceived', "Hello");
    }, 1000);
});