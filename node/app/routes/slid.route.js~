"use strict";

var multer = require("multer");
var SlidController = require("./../controllers/slid.controller.js");
var express = require("express");
var router = express.Router();
var CONFIG = process.env.CONFIG;
var slidController = new SlidController();

if (CONFIG==undefined){
	CONFIG=require("../../config.json");
}
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
//console.log(slid);
	slidController.list(response);
});

router.post("/slids", function (request, response) {
	slidController.create(request.body);
});

router.get("/slids/:slidId", function (request, response) {
	var id = request.params.slidId;
	console.log(id);
	slidController.read(id, function (erreur, data) {
		response.send(data);
		console.log(data);
console.log(erreur);
	});
});
