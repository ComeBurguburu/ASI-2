// app.js
"use strict";
var CONFIG = require("./config.json");
process.env.CONFIG  =  JSON.stringify(CONFIG);

var express = require("express");
var http = require("http");
var path = require("path");
var defaultRoute = require("./app/routes/default.route.js");
var slidRoute    = require("./app/routes/slid.route.js");
var utils = require("./app/utils/utils.js");
var fs = require("fs");
var _path = CONFIG.presentationDirectory;
var IOController = require("./app/controllers/io.controller.js");
var app = express();


app.get("/loadPres", function (req, response) {
	fs.readdir(_path, function (error, data) {
		var i,obj={};
		
		for (i = 0; i < data.length; i++) {
			var file = path.join(_path, data[i]);
			
			var content = fs.readFileSync(file, "utf-8");
			if (content == undefined) {
				return;
			}
			/*str = "<!DOCTYPE html>\n<html>\n<body>\n";*/
			/*var json = JSON.parse(content.toString());/*

			/*str += "<div>id: " + json.id + "</div>";
			str += "<div>title: " + json.title + "</div>";
			str += "<div>description: " + json.description + "</div>";
			*/
			/*var slide;
			for (slide in json.slidArray) {
				obj[json.slidArray[slide].id] =  json.slidArray[slide];
			}*/
/*


			str += "<script>console.log(JSON.parse(";


			str += "\"" + JSON.stringify(obj).replace(/"/g,"\\\"")+"\"";
			str += "))";
			str += "</script>\n</body>\n</html>";
			response.send(str);*/
			
		}
		//response.send(JSON.stringify(obj))
		response.send(content);


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
	//console.log(json_string);
var json=null;
	try{
	json = JSON.parse(json_string);
console.log("============================");
console.dir(json);
console.log("============================");
	}catch(e){

		response.send("json corrupted");
		}
if (json != null){
		fs.writeFileSync(path.join(CONFIG.presentationDirectory, json.id + ".pres.json"),json_string);
	
}
	response.send(CONFIG.presentationDirectory+"/"+ json.id + ".pres.json");
	

	
	});
});






// init server
var  server  = http.createServer(app);
server.listen(CONFIG.port);
IOController.listen(server);


app.use("/admin/", express.static(path.join(__dirname, "public/admin")));
app.use("/uploads/",express.static(path.join(__dirname,"uploads")));
//app.use("/lib/jquery/", express.static(path.join(__dirname, "public/lib/jquery")));
//app.use("/watch", express.static(path.join(__dirname, "public/watch.html")));
app.use(slidRoute);


app.use("/watch", express.static(path.join(__dirname, "public/watch.html")));
