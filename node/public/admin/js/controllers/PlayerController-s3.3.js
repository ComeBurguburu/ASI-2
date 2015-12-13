"use strict";
angular.module('adminApp').controller('playerCtrl', playerCtrlFnt);

playerCtrlFnt.$inject = ['$scope', '$log', '$window', 'comm', '$timeout', 'socket'];

function playerCtrlFnt($scope, $log, $window, comm, $timeout, socket) {
	function notify() {
		socket.notify($scope.currentSlide, $scope.contentMap);
	}

	var stopPlaying = false;
	var promise = [];
	var currentSlideId = undefined;
	var isPlay = false;

	var UP = 38,
		DOWN = 40,
		LEFT = 37,
		RIGHT = 39,
		SPACE = 32;

	$scope.shortcut = function (event) {
		switch (event.which) {
		case LEFT:
			$scope.backward();
			break;
		case RIGHT:
			$scope.forward();
			break;
		case UP:
			$scope.begin();
			break;
		case DOWN:
			$scope.end();
			break;
		case SPACE:
			if (isPlay) {
				$scope.pause();
			} else {
				$scope.play();
			}
			event.preventDefault();
			break;
		}

	}

	$scope.pause = function () {
		console.log("Pause function called");
		isPlay = false;

		for (var i = 0; i < promise.length; i++) {
			$timeout.cancel(promise.pop());
		}
	}

	$scope.end = function () {
		console.log("End function called");
		for (var slid in $scope.currentPresenation.slidArray) {
			$scope.forward();
		}
	}

	$scope.begin = function () {
		console.log("Begin function called");
		for (var slid in $scope.currentPresenation.slidArray) {
			$scope.backward();
		}
		notify();
	}

	$scope.backward = function () {
		console.log("Backward function called");

		currentSlideId = $scope.currentSlide.id;

		for (var slid in $scope.currentPresenation.slidArray) {
			if ($scope.currentSlide !== undefined && $scope.currentPresenation.slidArray[slid].id == $scope.currentSlide.id) {

				currentSlideId = $scope.currentPresenation.slidArray[slid].id;
				//	console.log("**********************************************");
				//	console.log("slid : " + slid);
				var slid_tmp_backward = slid;
				slid_tmp_backward--;
				//console.log("current slide : " + $scope.currentPresenation.slidArray[slid].id);

				if ($scope.currentPresenation.slidArray[slid_tmp_backward] == undefined) {
					console.log("First slide");
					break;
				}
				//console.log("previous slide : " + $scope.currentPresenation.slidArray[slid_tmp_backward].id);

				slid--;
				$scope.selectCurrentSlid($scope.currentPresenation.slidArray[slid]);
				break;
			}
		}
		notify();
	}

	$scope.forward = function () {
		console.log("Forward function called");

		for (var slid in $scope.currentPresenation.slidArray) {
			if ($scope.currentSlide !== undefined && $scope.currentPresenation.slidArray[slid].id == $scope.currentSlide.id) {
				//	console.log("**********************************************");
				//	console.log("slid : " + slid);
				currentSlideId = $scope.currentPresenation.slidArray[slid].id;
				var slid_tmp_forward = slid;
				slid_tmp_forward++;
				//	console.log("current slide : " + $scope.currentPresenation.slidArray[slid].id);

				if ($scope.currentPresenation.slidArray[slid_tmp_forward] == undefined) {
					console.log("Last slide");
					break;
				}
				//	console.log("next slide : " + $scope.currentPresenation.slidArray[slid_tmp_forward].id);

				slid++;
				$scope.selectCurrentSlid($scope.currentPresenation.slidArray[slid]);
				break;
			}
		}

		notify();
	}

	$scope.play = function () {
		console.log("Play function called");
		isPlay = true;

		var period = 1000;
		for (var slid in $scope.currentPresenation.slidArray) {
			promise.push($timeout((function () {
				$scope.forward();
			}), period += period));
		}
	}


	$scope.savePres = function () {
		console.log("SavePres function called");
		comm.savePres($scope.currentPresenation);
	}

	$scope.remove = function () {
		console.log("Remove function called");
		for (var slid in $scope.currentPresenation.slidArray) {
			if ($scope.currentSlide !== undefined && $scope.currentPresenation.slidArray[slid].id == $scope.currentSlide.id) {
				if ($scope.currentPresenation.slidArray[slid] == undefined) {
					console.log("No slide slected");
					break;
				}
				$scope.currentPresenation.slidArray.splice(slid, 1);
				break;
			}
		}
	}
};