"use strict";
var path = require("path");
var fs = require("fs");
var CONFIG = process.env.CONFIG;
if (CONFIG==undefined){
	CONFIG=require("../../config.json");	
}
var SlidModel = require("./../models/slid.model.js");

var SlidController = function SlidController() {
	this.list = function (response) {
		SlidModel.list(response);
	}

	this.create = function (request, response) {
		var content = "";

		request.on("data", function (data) {
			content += data.toString();
		});
		request.on("end", function () {

			var json_string = content;
		});
		SlidModel.create(new SlidModel(json_string));
	}

	this.read = function (id, callback) {
		var myPath = path.join(CONFIG.contentDirectory, id + ".meta.json");
		if(fs.statSync(myPath)){
			var content = fs.readFileSync(myPath, "utf-8");
			callback(null,new SlidModel(JSON.parse(content.toString())));
		}else{
			callback("no file in "+myPath);
		}
	}
}
module.exports = SlidController;
