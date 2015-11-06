"use strict";

var multer = require("multer");
var SlidController = require("./../controllers/slid.controller.js");
var express = require("express");
var router = express.Router();
var CONFIG = JSON.parse(process.env.CONFIG);
module.exports = router;

var multerMiddleware = multer({
	"dest": "/tmp/"
});

router.post("/slids", multerMiddleware.single("file"), function (request, response) {
	console.log(request.file.path); // The full path to the uploaded  file
	console.log(request.file.originalname); // Name of the file on the user's computer
	console.log(request.file.mimetype); // Mime type of the file
});

router.get("/slids", function (request, response) {
	fs.readdir(CONFIG.presentationDirectory, function (error, data) {
		var i, obj = {},
			str = "";
		for (i = 0; i < data.length; i++) {
			var file = path.join(_path, data[i]);
			var content = fs.readFileSync(file, "utf-8");
			if (content == undefined) {
				return;
			}
			/*str = "<!DOCTYPE html>\n<html>\n<body>\n";*/
			var json = JSON.parse(content.toString());
			/*

						/*str += "<div>id: " + json.id + "</div>";
						str += "<div>title: " + json.title + "</div>";
						str += "<div>description: " + json.description + "</div>";
						*/
			var slide;
			for (slide in json.slidArray) {
				str += json.slidArray[slide].id;
			}

		}
		response.send(str);


	});
});

router.post("/slids", function (request, response) {
	var content = "";

	request.on("data", function (data) {
		content += data.toString();
	});
	request.on("end", function () {


		var json_string = content;
	});
	SlidModel.create(new SlidModel(json_string));
});

router.get("/slids/:slidId", function (request, response) {
	var id = req.params.sildId;
	SlidModel.read(id, function (erreur, data) {
		response.send(data.fileName);
	});
});