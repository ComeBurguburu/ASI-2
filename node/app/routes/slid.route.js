"use strict";

var CONFIG = JSON.parse(process.env.CONFIG);
var multer = require("multer");
var SlidController = require("./../controllers/slid.controller.js");
var express = require("express");
var router = express.Router();
var utils = require("./../utils/utils.js");
var slidModel = require("./../models/slid.model.js");
var fs = require("fs");
var path = require("path");

if (CONFIG == undefined) {
	CONFIG = require("../../config.json");
}
module.exports = router;

var multerMiddleware = multer({
	"dest": "tmp/"
});
router.post("/file-upload", multerMiddleware.single("file"), function (request, response) {

	var _path = request.file.path
	var originalName = request.file.originalname
	var mime_type = request.file.mimetype;
	var uuid = utils.generateUUID();
	var filename = uuid + path.extname(originalName);

	var target_path = 'uploads/' + filename;

	var src = fs.createReadStream(_path);
	var dest = fs.createWriteStream(target_path);
	src.pipe(dest);

	src.on('end', function () {
		console.log("end");
	});
	src.on('error', function (err) {
		console.error(err);
	});


	var mySlide = new slidModel(JSON.stringify({
		type: utils.getFileType(mime_type),
		id: uuid,
		title: originalName,
		fileName: filename,
		src: "../" + target_path
	}));

	slidModel.create(mySlide, function (err, data) {
		if (err) {
			console.error(err);
			response.send(err);
		} else {
			response.send("picture uploaded");
		}
	});
});

router.get("/slids", SlidController.list);
router.get("/resources_list", SlidController.pict);
router.get("/loadPres", SlidController.loadPres);
router.post("/savePres", SlidController.savePres);


router.get("/slids/:slidId", function (request, response) {
	var id = request.params.slidId;
	console.log(id);
	SlidController.read(id, function (erreur, data) {
		response.send(data);
		console.log(data);
		console.log(erreur);
	}, request.query.json);
});