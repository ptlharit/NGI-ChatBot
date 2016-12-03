"use strict"
var express = require('express');
var bodyParser = require('body-parser');

var bot_router = require('./bot_routes');
//var task_runner = require('./task_routes');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/bot', bot_router);
//app.use('/taskRunner', task_runner)
app.listen(8000, function() {
  console.log("listening on port 8000")
})
