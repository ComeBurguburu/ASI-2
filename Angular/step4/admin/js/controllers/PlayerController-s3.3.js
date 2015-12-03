
angular.module('adminApp').controller('playerCtrl',playerCtrlFnt);

playerCtrlFnt.$inject=['$scope','$log','$window','comm','$timeout'];

function playerCtrlFnt($scope, $log, $window, comm, $timeout){


	var stopPlaying = false;

	var promise;

	var currentSlideId;


	$scope.pause=function(){
		console.log("Pause function called");
		$timeout.cancel(promise);
	}

	$scope.end=function(){
		console.log("End function called");
		for (var slid in $scope.currentPresenation.slidArray){
	  		$scope.forward();
	  	}
	}

	$scope.begin=function(){
		console.log("Begin function called");
		for (var slid in $scope.currentPresenation.slidArray){
	  		$scope.backward();
	  	}
	}

	$scope.backward=function(){
		console.log("Backward function called");

		currentSlideId = $scope.currentSlide.id;

		for (var slid in $scope.currentPresenation.slidArray)
		{	
			if($scope.currentPresenation.slidArray[slid].id==$scope.currentSlide.id){

				currentSlideId = $scope.currentPresenation.slidArray[slid].id;
				console.log("**********************************************");
				console.log("slid : " + slid);
				var slid_tmp_backward = slid;
				slid_tmp_backward--;
				console.log("current slide : " + $scope.currentPresenation.slidArray[slid].id);

				if($scope.currentPresenation.slidArray[slid_tmp_backward]==undefined){
					console.log("First slide");
					break;
				}
				console.log("previous slide : " + $scope.currentPresenation.slidArray[slid_tmp_backward].id);

				slid--;
				$scope.selectCurrentSlid($scope.currentSlide=$scope.currentPresenation.slidArray[slid]);
				break;
			}
		}
	}

	$scope.forward=function(){
		console.log("Forward function called");	

		for (var slid in $scope.currentPresenation.slidArray)
		{	
			if($scope.currentPresenation.slidArray[slid].id==$scope.currentSlide.id){
				console.log("**********************************************");
				console.log("slid : " + slid);
				currentSlideId = $scope.currentPresenation.slidArray[slid].id;
				var slid_tmp_forward = slid;
				slid_tmp_forward++;
				console.log("current slide : " + $scope.currentPresenation.slidArray[slid].id);

				if($scope.currentPresenation.slidArray[slid_tmp_forward]==undefined){
					console.log("Last slide");
					break;
				}
				console.log("next slide : " + $scope.currentPresenation.slidArray[slid_tmp_forward].id);

				slid++;
     			$scope.selectCurrentSlid($scope.currentSlide=$scope.currentPresenation.slidArray[slid]);
				break;
			}
		}
		

	}

	$scope.play=function(){
		console.log("Play function called");

		// $interval((function() {
		//   	for (var slid in $scope.currentPresenation.slidArray){
		//   		$scope.forward();
		//   	}
  //       }), 5000, 1);

		// for (var slid in $scope.currentPresenation.slidArray){
		// 	comm.loadPres(slid.title,slid.id);
		// }
		promise = $timeout((function() {
			for (var slid in $scope.currentPresenation.slidArray){
		  	//for (var slid in $scope.currentPresenation.slidArray){
		  		$scope.forward();
		  	}
        }), 5000);
		
	}

	$scope.savePres=function(){
		console.log("SavePres function called");
		comm.savePres();
	}

	$scope.remove=function(){
		console.log("Remove function called");
		for (var slid in $scope.currentPresenation.slidArray)
		{	
			if($scope.currentPresenation.slidArray[slid].id==$scope.currentSlide.id){
				if($scope.currentPresenation.slidArray[slid]==undefined){
					console.log("No slide slected");
					break;
				}
				$scope.$on('$destroy', function(){
					$scope.cancel($scope.currentPresenation.slidArray[slid].id);
				});
				/*
				$scope.$on(
					"$destroy",
					function handleDestroyEvent(){
						scope.currentPresenation.slidArray[slid].id;
					});
				*/	
				break;
			}
		}
	}
};