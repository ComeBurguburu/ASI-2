// app.js
"use strict";
var CONFIG = require("./config.json");
process.env.CONFIG  =  JSON.stringify(CONFIG);

var express = require("express");
var http = require("http");
var path = require("path");
var defaultRoute = require("./app/routes/default.route.js");
var slidRoute = require("./app/routes/slid.route.js");
var utils = require("./app/utils/utils.js");
var fs = require("fs");
var _path = path.join(__dirname, CONFIG.presentationDirectory);
var IOController = require("./app/controllers/io.controller.js");
var app = express();

// init server
var  server  = http.createServer(app);
server.listen(CONFIG.port);
IOController.listen(server);

app.use("/", express.static(path.join(__dirname, "public/login")));
app.use("/admin/", express.static(path.join(__dirname, "public/admin")));
app.use("/uploads/", express.static(path.join(__dirname, "uploads")));
app.use("/watch", express.static(path.join(__dirname, "public/watch")));
app.use("/socket", express.static(path.join(__dirname, "public/socket")));
app.use(slidRoute);