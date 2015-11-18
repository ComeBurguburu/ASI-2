"use strict";

var CONFIG = JSON.parse(process.env.CONFIG);
var multer = require("multer");
var SlidController = require("./../controllers/slid.controller.js");
var express = require("express");
var router = express.Router();
var utils = require("./../models/slid.model.js");

if (CONFIG==undefined){
	CONFIG=require("../../config.json");
}
module.exports = router;

var multerMiddleware = multer({
	"dest": "/tmp/"
});

router.post("/slids", multerMiddleware.single("file"), function (request, response) {
	var _path = request.file.path
	console.log(path); // The full path to the uploaded  file
	var originalName = request.file.originalname
	console.log(originalName); // Name of the file on the user's computer
	var mime_type = request.file.mimetype;
	console.log(mime_type); // Mime type of the file
	
	var uuid = utils.generateUUID();
	var mySlide = {type: mime_type,  id: uuid,   title: originalName,fileName: uuid+".png"};
	
	slidController.create(request.body);
});

console.dir(SlidController);
router.get("/slids", SlidController.list);


router.get("/slids/:slidId", function (request, response) {
	var id = request.params.slidId;
	console.log(id);
	SlidController.read(id, function (erreur, data) {
		response.send(data);
		console.log(data);
		console.log(erreur);
	});
});
