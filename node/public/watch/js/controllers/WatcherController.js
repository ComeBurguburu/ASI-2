"use strict";
angular.module('watcherApp').controller('watcherCtrl', watcherCrtFnt);

watcherCrtFnt.$inject = ['$scope'];

function watcherCrtFnt($scope) {

	var socket = io.connect();

	socket.on('connection', function (msg) {
		socket.emit("data_comm", {
			id: 42
		});

	});
	socket.on('currentSlidEvent', function (msg) {
		var json = "";

		try {
			json = JSON.parse(msg);
		} catch (e) {

		}

		if (json === "") {
			alert("erroe")
			return;
		}
		$scope.txt = json.txt;
		$scope.src = json.src;
		$scope.title = json.title;
		$scope.title_message = "new slides !!!";
		$scope.$apply();
	});

}