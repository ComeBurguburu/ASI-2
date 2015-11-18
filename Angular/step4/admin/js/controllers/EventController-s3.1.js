angular.module('adminApp').controller('eventCtrl', ['$scope','$log','$window', 'factory', function loginCrtFnt($scope, $log, $window, factory){



	$scope.currentPresentation=factory.presentationCreation("Star wars","presentation episode 7");
	
	//console.log($scope.currentSlid);
	$scope.newSlide=function(titleSlid,txtSlid,contentTitle,contentType,contentSrc){ 
		currentSlid = factory.slidCreation(titleSlid,txtSlid);
		currentSlid.contentMap[titleSlid] = factory.contentCreation(contentTitle,contentType,contentSrc);
		$scope.currentPresentation.slidArray[titleSlid] = currentSlid;
	 };
	 $scope.newSlide("Dark Vador", "Bonjour je m'appelle Dark Vador","description dark vador","Dark Vador est une machine-humaine","../admin/img/Dark-Vador.jpg");
	 $scope.newSlide("Luke", "Bonjour je m'appelle Luke","description Luke","Luke est un jedi","../admin/img/Luke.jpg");
	 $scope.newSlide("Clone", "Bonjour je suis un clone","description Clone","Clone est un soldat","../admin/img/Clone.jpg");
	console.log($scope.currentPresentation.slidArray);



	$scope.selectCurrentSlid=function(slide){
 		$scope.currentSlide=slide;
 		console.log($scope.currentSlide);
 	}

	$scope.isSlidContentEmpty=function(slid){
	 	if(slid.contentMap[1]== undefined){
	 	return true;
	 	}
	 	return false
	} 

}]);

