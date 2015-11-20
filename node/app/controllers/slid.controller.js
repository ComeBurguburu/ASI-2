"use strict";
var CONFIG = JSON.parse(process.env.CONFIG);

var path = require("path");
var fs = require("fs");
var SlidModel = require("./../models/slid.model.js");

var SlidController = function () {}

SlidController.list = function (request,response,callback) {
	//console.dir(callback);
	SlidModel.list(response,function(err,data){
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

SlidController.read = function (id, callback) {
	var myPath = path.join(CONFIG.contentDirectory, id + ".meta.json");
	if(fs.statSync(myPath)){
		var content = fs.readFileSync(myPath, "utf-8");
		callback(null,new SlidModel(JSON.parse(content.toString())));
	}else{
		callback("no file in "+myPath);
	}
}
module.exports = SlidController;
