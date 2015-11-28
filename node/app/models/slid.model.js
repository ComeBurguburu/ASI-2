"use strict";

var CONFIG = JSON.parse(process.env.CONFIG);
var path = require("path");
var fs = require("fs");
var utils = require("../utils/utils.js");

//module			//constructor
var SlidModel = function SlidModel(json) {


	//public
	this.id = null;
	this.title = null;
	this.fileName = null;
	this.type = null;

	//private
	var data = null;

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
		console.error("no id");
	}
	if (json.title) {
		this.title = json.title;
	} else {
		console.error("no title");
	}
	if (json.fileName) {
		this.fileName = json.fileName;
	} else {
		console.error("no filename");
	}
	if (json.type) {
		this.type = json.type;
	} else {
		console.error("no type");
	}
	if (json.data) {
		this.setData(json.data);
	} else {
		this.setData(null);
	}
	if (json.src) {
		this.src = json.src;
	}

}
SlidModel.create = function (slid, callback) {
	if (typeof slid.id !== "string") {
		callback("slide corrupted no id:" + JSON.stringify(slid));
	} else if (typeof slid.fileName !== "string") {
		callback("slide corrupted no fileName:" + JSON.stringify(slid));
	} else {

		fs.writeFile(path.join(CONFIG.contentDirectory, slid.id + ".meta.json"), JSON.stringify(slid), function (err, data) {
			if (err) {
				callback(err);
			} else {
				callback(null);
			}
		});
	}

}

SlidModel.read = function (id, callback) {
	var myPath = path.join(CONFIG.contentDirectory, id + ".meta.json");

	fs.stat(myPath, function (err, data) {
		if (err) {
			callback(err);
		}
		fs.readFile(myPath, "utf-8", function (err, data) {
			if (err) {
				callback(err);
			} else {
				callback(null, new SlidModel(JSON.parse(data)));
			}
		});
	});

}

SlidModel.update = function (slid, callback) {
	if (slid.getData() != null && slid.getData().length > 0) {
		SlidModel.read(slid.id, function (err, slidModel) {
			if (err) {
				callback(err);
				return;
			}
			SlidModel.create(slid, callback);
		});
	}
}
SlidModel.list = function (response, callback) {
	var i, slidArray = [],
		cpt = 0;
	fs.readdir(CONFIG.contentDirectory, function (error, data_dir) {

		var j = 0;

		for (i = 0; i < data_dir.length; i++) {
			var file = path.join(CONFIG.contentDirectory, data_dir[i]);
			fs.readFile(file, "utf-8", function (err, data) {
				if (err) {
					console.error(err);
					callback(err);
					return;
				}

				//	if (path.extname(file) == '.json') { // added to avoid the problem of .png files

				var json = "";
				try {
					json = JSON.parse(data.toString());
					slidArray[j] = json.id;
					j = j + 1;
				} catch (e) {

				}


				//	}
				cpt++;
				if (cpt == data_dir.length - 1) {

					if (slidArray != []) {
						callback(null, JSON.stringify(slidArray));
					} else {
						console.error(error);
						callback(error);
					}
					return;
				}
			});
		}; //loop end	

	});
}
SlidModel.loadPres = function (response, callback) {
	var i, slidArray = [],
		cpt = 0;
	fs.readdir(CONFIG.presentationDirectory, function (error, data_dir) {

		var j = 0;

		for (i = 0; i < data_dir.length; i++) {
			var file = path.join(CONFIG.presentationDirectory, data_dir[i]);
			console.log(file);
			fs.readFile(file, "utf-8", function (err, data) {
				if (err) {
					console.error(err)
					callback(err);
					return;
				}

				//	if (path.extname(file) == '.json') { // added to avoid the problem of .png files

				var json = "";
				try {
					json = JSON.parse(data.toString());
					slidArray[j] = json;
					j = j + 1;
				} catch (e) {

				}


				//	}
				cpt++;
				if (cpt == data_dir.length) {

					if (slidArray != []) {
						var obj = {
							"id": "00002",
							"title": "nototo",
							"description": "Welcome to this first présentation do you need some help?",
							"slidArray": slidArray
						};
						//callback(null, JSON.stringify([obj]));
						callback(null, JSON.stringify(slidArray));
					} else {
						callback(error);
					}
					return;
				}
			});
		}; //loop end	

	});
}
SlidModel.pict = function (response, callback) {
	var i, obj = {},
		cpt = 0;
	fs.readdir(CONFIG.contentDirectory, function (error, data_dir) {

		var j = 0;
		if (error) {
			return console.error(error);
		}

		for (i = 0; i < data_dir.length; i++) {
			var file = path.join(CONFIG.contentDirectory, data_dir[i]);
			fs.readFile(file, "utf-8", function (err, data) {

				if (err) {
					console.error(error);
					callback(err);
					return;
				}

				//if (path.extname(file) == ".json") { // added to avoid the problem of .png files


				var json = "";
				try {
					json = JSON.parse(data.toString());
					json.id = j;
					obj[j] = json;
					j = j + 1;
				} catch (e) {

				}

				//}
				cpt++;

				if (cpt == data_dir.length) {
					callback(null, JSON.stringify(obj));
					return;
				}
			});
		}; //loop end	

	});
}

SlidModel.delete = function (id, callback) {

	SlidModel.read(id, function (err, slid) {
		if (err) {
			callback(err);
			return;
		}
		if (slid.fileName == null) {
			callback("no filename");
			return;
		}
		var path_img = path.join(CONFIG.contentDirectory, slid.fileName);


		utils.readFileIfExists(path_img, function (err, data) {
			if (err) {
				callback(err);
				return;
			} else {
				fs.unlink(data, function (err, data) {});
				var path2 = path.join(CONFIG.contentDirectory, id.toString() + ".meta.json");

				utils.readFileIfExists(path2, function (err, data) {
					if (err) {
						callback(null);
						return;
					} else {
						fs.unlink(data, function (err, data) {});
						callback(null);
					}
				});

			}
		})
	})
}

module.exports = SlidModel;