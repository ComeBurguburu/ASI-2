angular.module('adminApp').controller('eventCtrl', eventCrtFnt);

eventCrtFnt.$inject = ['$scope', '$log', '$window', 'factory', 'comm', 'socket'];

function eventCrtFnt($scope, $log, $window, factory, comm, socket) {


	$scope.currentPresenation = factory.presentationCreation("template_pres", "description of the template présentation");

	//CREATE an object for interactions with ng-include controller
	$scope.contentMap = {};
	$scope.contentMap.payload = "";

	$scope.presentationMap = {};
	$scope.presentationMap.payload = "";

	var available_content = comm.loadImages('test', 'test');
	available_content.then(
		function (payload) {
			$scope.contentMap.payload = payload;
			$scope.contentMap.array = factory.mapToArray(payload);
			console.log($scope.contentMap.array);
		},
		function (errorPayload) {
			$log.error('failure loading movie', errorPayload);
		});

	var firstPresentation = comm.loadPres('test', 'test');
	firstPresentation.then(
		function (payload) {
			$scope.presentationMap.payload = payload;

			for (key in $scope.presentationMap.payload) {
				console.log($scope.currentPresenation);
				$scope.currentPresenation = $scope.presentationMap.payload[key];
			}

		},
		function (errorPayload) {
			$log.error('failure loading movie', errorPayload);
		});


	$scope.newSlide = function () {
		var slid = factory.slidCreation("", "");
		$scope.currentPresenation.slidArray.push(slid);

	}

	$scope.savePres = function () {
		promise = comm.savePres($scope.currentPresenation);
		promise.then(function (data) {
				alert("save successed");
			},
			function (data) {
				alert("error connection failed");
			});
	}

	$scope.selectCurrentSlid = function (slide) {
		$scope.currentSlide = slide;
		//console.log(slide);
		console.log(slide.id + "==" + $scope.currentSlide.id);
		socket.notify($scope.currentSlide, $scope.contentMap);

	}


	$scope.onDragComplete = function (data, evt) {
		console.log("drag success, data:", data);
	}


	$scope.onDropComplete = function (data, evt) {
		if ($scope.currentSlide != undefined) {
			$scope.currentSlide.contentMap[1] = data.id;
			//needed to inform angular that a change occurred on the current variable, this fire an event change
			$scope.$apply()
			console.log("drop success, data:", data);
		}
	}

	$scope.getCurrentContent = function () {
		if (1 in $scope.currentSlide.contentMap) {
			return $scope.currentSlide.contentMap[1];
		}
	}

	$scope.isSlidContentEmpty = function (slid) {
		if (slid.contentMap[1] == undefined) {
			return true;
		}
		return false
	}



};