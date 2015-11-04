// app.js
var express = require("express");
var http = require("http");
var CONFIG = require("./config.json");
var path = require("path");
var defaultRoute = require("./app/routes/default.route.js");

process.env.CONFIG  =  JSON.stringify(CONFIG);



var app = express();


// init server
var  server  = http.createServer(app);
server.listen(CONFIG.port);



app.use("/", express.static(path.join(__dirname, "public/")));
app.use("/lib", express.static(path.join(__dirname, "lib/")));
//app.use("/watch", express.static(path.join(__dirname, "public/watch.html")));









