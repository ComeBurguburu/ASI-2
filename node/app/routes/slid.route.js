"use strict";

var CONFIG = JSON.parse(process.env.CONFIG);
var multer = require("multer");
var SlidController = require("./../controllers/slid.controller.js");
var express = require("express");
var router = express.Router();
var utils = require("./../utils/utils.js");
var slidModel = require("./../models/slid.model.js");
var fs=require("fs");
var path = require("path");

if (CONFIG==undefined){
	CONFIG=require("../../config.json");
}
module.exports = router;

var multerMiddleware = multer({
"dest": "tmp/"});/*,
            onFileUploadStart : function(file){
                console.log('File recieved:');
                console.log(file);
            },
             onFileUploadData:function (file,data){
                console.log('Data recieved');
            },
             onParseEnd: function(req,next){
                next();
				console.log("end");
             }
            
});*/

router.post("/slids", multerMiddleware.single("file"), function (request, response) {
	// console.dir(Object.keys(request));
	//console.dir(request);
	/*if(request.file)
	response.send("bien reçu");
	else
	response.send("rien reçu");
	return;*/
	var _path = request.file.path
	console.log(_path); // The full path to the uploaded  file
	var originalName = request.file.originalname
	console.log(originalName); // Name of the file on the user's computer
	var mime_type = request.file.mimetype;
	console.log(mime_type); // Mime type of the file
	var uuid = utils.generateUUID();
	var filename = uuid + path.extname(originalName);
	
	
	var target_path = 'uploads/' + filename;

  /** A better way to copy the uploaded file. **/
  var src = fs.createReadStream(_path);
  var dest = fs.createWriteStream(target_path);
  src.pipe(dest);
  src.on('end', function() { console.log("end");});
  src.on('error', function(err) {console.log(err);});
	
	
	var mySlide = new slidModel(JSON.stringify({type: utils.getFileType(mime_type),  id: uuid,   title: originalName,fileName: filename }));
	
	slidModel.create(mySlide,function(err,data){
		if(err){
			response.send(err);
		}else{
			response.send("it work");
		}
	});
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
