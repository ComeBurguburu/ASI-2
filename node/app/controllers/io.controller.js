"use strict";
var io = require('socket.io');
var SlidModel = require("../models/slid.model.js");

var mapSocket = [];

var controller = function () {};



controller.listen = function (server) {

	var ioServer = io.listen(server);
	ioServer.set('log level', 1);

	var obj;

	ioServer.on('connection', function (socket) {
		/**
		 * Log de connexion et de déconnexion des utilisateurs
		 */
		socket.emit('connection', 'I\'m ready');


		socket.on('slidEvent', function (data) {

			obj = JSON.parse(data);

			var s;
			for (s in mapSocket) {
				mapSocket[s].emit('currentSlidEvent', JSON.stringify(obj));
			}
		});


		socket.on('data_comm', function (data) {
			var json = "";

			if (data instanceof Object) {
				json = data;
			}

			try {
				json = JSON.parse(data);
			} catch (e) {}
			if (json == "") {
				return;
			}
			if (mapSocket.indexOf(this) == -1) {
				mapSocket.push(this);
				console.log(Object.keys(mapSocket).length);
			}

		});
	})
};
module.exports = controller;