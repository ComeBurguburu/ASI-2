"use strict";
var CONFIG = JSON.parse(process.env.CONFIG);

var path = require("path");
var fs = require("fs");
var SlidModel = require("./../models/slid.model.js");

var SlidController = function () {}

SlidController.list = function (request, response, callback) {
		//console.dir(callback);
		SlidModel.list(response, function (err, data) {
			response.send(data);
		});
	}
	//SlidController.getData = function(){return SlidModel.getData();};

SlidController.create = function (request, response) {
	var content = "";

	request.on("data", function (data) {
		content += data.toString();
	});
	request.on("end", function () {

		var json_string = content;
		SlidModel.create(new SlidModel(json_string));
	});
}

SlidController.read = function (id, callback, json) {
	var myPath = path.join(CONFIG.contentDirectory, id + ".meta.json");
	fs.stat(myPath, function (err, data) {
		if (err) {
			callback("no file in " + myPath);
			return;
		}
		fs.readFile(myPath, "utf-8", function (err, data) {
			if (err) {
				callback(err);
			} else {
				if (json == true) {
					callback(null, JSON.parse(content.toString()));
				} else {
					callback(null, new SlidModel(JSON.parse(content.toString())));
				}
			}
		});
	});
}
module.exports = SlidController;