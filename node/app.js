// app.js
"use strict";
var express = require("express");
var http = require("http");
var CONFIG = require("./config.json");
var path = require("path");
var defaultRoute = require("./app/routes/default.route.js");
var slidRoute    = require("./app/routes/slid.route.js");
var fs = require("fs");
var _path = CONFIG.presentationDirectory;
var IOController = require("./app/controllers/io.controller.js");
var app = express();


process.env.CONFIG  =  JSON.stringify(CONFIG);
app.get("/loadPress", function (req, response) {
	fs.readdir(_path, function (error, data) {
		var i,obj={};
		for (i = 0; i < data.length; i++) {
			var file = path.join(_path, data[i]);
			
			var content = fs.readFileSync(file, "utf-8");
			if (content == undefined) {
				return;
			}
			/*str = "<!DOCTYPE html>\n<html>\n<body>\n";*/
			var json = JSON.parse(content.toString());/*

			/*str += "<div>id: " + json.id + "</div>";
			str += "<div>title: " + json.title + "</div>";
			str += "<div>description: " + json.description + "</div>";
			*/
			var slide;
			for (slide in json.slidArray) {
				obj[json.slidArray[slide].id] =  json.slidArray[slide];
			}
/*


			str += "<script>console.log(JSON.parse(";


			str += "\"" + JSON.stringify(obj).replace(/"/g,"\\\"")+"\"";
			str += "))";
			str += "</script>\n</body>\n</html>";
			response.send(str);*/
			
		}
		response.send(JSON.stringify(obj))


	});
});

app.post("/savePress",function(request, response){
	var content = "";
	
	request.on("data", function(data){
		content+=data.toString();
	});
	request.on("end",function(){
	
	//fs.mkdir(path.join(_path,"coucou"));
	var json_string = content;// req.get();
	console.log(json_string);
	try{
	var json = JSON.parse(json_string);
	for(id in json){
		
		fs.writeFileSync(path.join(CONFIG.contentDirectory,json[id].id+".pres.json.txt"),json["id"]);
	}
	response.send(CONFIG.contentDirectory+"/test.txt");
	
	}catch(e){
		response.send("json corrupted");
		}
	
	});
});






// init server
var  server  = http.createServer(app);
server.listen(CONFIG.port,"127.0.0.1");
console.log(IOController);
IOController.listen(server);


app.use("/", express.static(path.join(__dirname, "public/")));
app.use("/lib", express.static(path.join(__dirname, "lib/")));
//app.use("/watch", express.static(path.join(__dirname, "public/watch.html")));
app.use(slidRoute);

app.use("/lib/angular", express.static(path.join(__dirname, "lib/angular")));
app.use("/lib/jquery", express.static(path.join(__dirname, "lib/jquery")));
app.use("/lib/bootstrap/css", express.static(path.join(__dirname, "lib/bootstrap/css")));
app.use("/lib/bootstrap/js", express.static(path.join(__dirname, "lib/bootstrap/js")));
app.use("/js/application", express.static(path.join(__dirname, "public/js/application")));
app.use("/js/controllers", express.static(path.join(__dirname, "public/js/controllers")));
app.use("/watch", express.static(path.join(__dirname, "public/watch.html")));
