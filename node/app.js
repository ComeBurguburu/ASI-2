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
var _path = CONFIG.presentationDirectory;
var IOController = require("./app/controllers/io.controller.js");
var app = express();

app.get("/loadPres", function (req, response) {
	fs.readdir(_path, function (error, data) {
		var i, obj = {};

		for (i = 0; i < data.length; i++) {
			var file = path.join(_path, data[i]);

			fs.readFile(file, "utf-8", function (err, data) {
				if (err) {
					response.send(err);
				} else {
					response.send(data)
				}
			});
		}
	});
});

app.post("/savePress", function (request, response) {
	var json_string = "";

	request.on("data", function (data) {
		json_string += data.toString();
	});
	request.on("end", function () {

		var json = null;
		try {
			json = JSON.parse(json_string);
			console.log("============================");
			console.dir(json);
			console.log("============================");
		} catch (e) {

			response.send("json corrupted");
		}
		if (json != null) {
			fs.writeFile(path.join(CONFIG.presentationDirectory, json.id + ".pres.json"), json_string, function (err) {
				if (err) {
					response.send(err)
				}
				console.log(path.join(CONFIG.presentationDirectory, json.id + ".pres.json"));
				response.send("");
			});
		}

	});
});

// init server
var  server  = http.createServer(app);
server.listen(CONFIG.port);
IOController.listen(server);

app.use("/", express.static(path.join(__dirname, "public/login")));
app.use("/admin/", express.static(path.join(__dirname, "public/admin")));
app.use("/uploads/", express.static(path.join(__dirname, "uploads")));
app.use("/watch", express.static(path.join(__dirname, "public/watch.html")));
app.use(slidRoute);