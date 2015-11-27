"use strict";
var io = require('socket.io');
var SlidModel = require("../models/slid.model.js");

var mapSocket = {};

var controller = function () {};



controller.listen = function (server) {

	var ioServer = io.listen(server);
	ioServer.set('log level', 1);



	ioServer.on('connection', function (socket) {
		/**
		 * Log de connexion et de déconnexion des utilisateurs
		 */
		socket.emit('connection', 'I\'m ready');

		console.log('a user connected');

		socket.on('slidEvent', function (data) {
			console.log("slidEvent received " + data);
			var obj = JSON.parse(data);
			var id = obj.PRES_ID;
			SlidModel.read(id, function (err, data) {
				if (err) {
					socket.emit('connection', JSON.stringify(err));
				} else {
					socket.emit('connection', JSON.stringify(data));
				}
			});
		});

		socket.on('data_comm', function (err, data,arg0,arg1,arg2) {
			var json = "";
			console.log(arg0);
			console.log(arg1);
			console.log(arg2);
			
			try{
				json = JSON.parse(data);
			}catch(e){
				
			}
			if(json == ""){
				return;
			}
			
			mapSocket[data.id] = "";

		});
	})
};
module.exports = controller;