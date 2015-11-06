"use strict";
var CONFIG = require("./config.json");
process.env.CONFIG  =  JSON.stringify(CONFIG);
var path = require("path");
var fs = require("fs");


function SlidModel() {

	this.id = 3;
	this.title = "";
	this.fileName = "";
	this.type = "";
	var data = "";
}

	SlidModel.create = function(slid ,callback)
	{
		fs.writeFileSync(path.join(CONFIG.contentDirectory,slid.fileName),slid.getData());
		fs.writeFileSync(path.join(CONFIG.contentDirectory,slid.id+".meta.json"),JSON.stringify(slid));
		callback(NULL);

	}
	SlidModel.read = function(id,callback) 
	{
		var content = fs.readFileSync(path.join(CONFIG.contentDirectory,id + ".meta.json"),"utf-8");
		callback(NULL,SlidModel.constructor(JSON.parse(content.toString())));
		
	}
	SlidModel.update = function(slid,callback) 
	{
		if(slid.getData()!=null && slid.getData().length > 0){
			SlidModel.create(slid, callback);
		}
	}
	SlidModel.delete = function(id,callback) 
	{
		fs.unlinkSync(path.join(CONFIG.contentDirectory,slid.fileName))
		fs.unlinkSync(path.join(CONFIG.contentDirectory,slid.id+".meta.json"));
		
		callback();
	}
	SlidModel.getData = function (){
		return data;
	}
	SlidModel.setData = function(d){
		data = d;
	}
	SlidModel.constructor(json){
		this.id = json.id;
		this.title = json.title;
		this.fileName = json.filename;
		this.type = json.type;
		this.setData(json.data);
		
	}

