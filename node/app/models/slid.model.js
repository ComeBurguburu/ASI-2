"use strict";
var CONFIG = JSON.parse(process.env.CONFIG);
var path = require("path");
var fs = require("fs");

//module			//constructor
var SlidModel = function SlidModel(json) {


	//public
	this.id = 3;
	this.title = "";
	this.fileName = "";
	this.type = "";

	//private
	var data = "";
	
	this.getData = function () {
		return SlidModel.data;
	}

	this.setData = function (d) {
		SlidModel.data = d;
	}

	if (json === undefined) {
		return;
	}

	if (typeof json !== "object") {
		try {
			json = JSON.parse(json)
		} catch (e) {
			console.error(e);
			return;
		}
	}


	if (json.id) {
		this.id = json.id;
	} else {
		console.error( "no id");
	}
	if (json.title) {
		this.title = json.title;
	} else {
		console.error( "no title");
	}
	if (json.fileName) {
		this.fileName = json.filename;
	} else {
		console.error( "no filename");
	}
	if (json.type) {
		this.type = json.type;
	} else {
		console.error( "no type");
	}
	if (json.data) {
		this.setData(json.data);
	} else {
		this.setData(null);
	}

}
SlidModel.create = function (slid, callback) {
	if(typeof slid.id !== "number" || typeof slid.fileName !== "string"){
		callback("slide corrupted");
	}else{
		fs.writeFileSync(path.join(CONFIG.contentDirectory, slid.fileName), slid.getData());
		fs.writeFileSync(path.join(CONFIG.contentDirectory, slid.id + ".meta.json"), JSON.stringify(slid));
		callback(null);
	}

}

SlidModel.read = function (id, callback) {
	var myPath = path.join(CONFIG.contentDirectory, id + ".meta.json");
	
	if(fs.stat(myPath)){
		var content = fs.readFileSync(myPath, "utf-8");
		callback(null,new SlidModel(JSON.parse(content.toString())));
	}else{
		callback("no file");
	}

}

SlidModel.update = function (slid, callback) {
	if (slid.getData() != null && slid.getData().length > 0) {
		SlidModel.create(slid, callback);
	}
}

SlidModel.delete = function (id, callback) {
	var path1 = path.join(CONFIG.contentDirectory, id.toString() + ".txt" );
	
	if(fs.stat(path1)){
		fs.unlinkSync(path1);
	}else{
		callback(path1+" not found");
		return;
	}
	
	var path2 = path.join(CONFIG.contentDirectory, id.toString() + ".meta.json");
	
	if(fs.stat(path2)){
		fs.unlinkSync(path2);
	}else{
		callback(path2+" not found");
		return;
	}
	callback(null);
}

module.exports = SlidModel;