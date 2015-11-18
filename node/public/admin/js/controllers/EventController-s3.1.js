angular.module('adminApp').controller('eventCtrl', ['$scope','$log','$window', 'factory', function loginCrtFnt($scope, $log, $window, factory){



	$scope.currentPresentation=factory.presentationCreation("Star wars","presentation episode 7");
	
	//console.log($scope.currentSlid);
	$scope.newSlide=function(titleSlid,txtSlid,contentTitle,contentType,contentSrc){ 
		currentSlid = factory.slidCreation(titleSlid,txtSlid);
		currentSlid.contentMap[titleSlid] = factory.contentCreation(contentTitle,contentType,contentSrc);
		$scope.currentPresentation.slidArray[titleSlid] = currentSlid;
	 };
	 $scope.newSlide("Dark Vador", "Bonjour je m'appelle Dark Vador","description dark vador","Dark Vador est une machine-humaine","../admin/img/Dark-Vador.jpg");
	 $scope.newSlide("Luke", "Bonjour je m'appelle Luke","description dark vador","Luke est un jedi","../admin/img/Luke.jpg");
	
	// function displaySlid(currentPresentation){
	// 	for (var id in currentPresentation)
	// 	{
	// 		document.innerHtml
	// 	}
	// }
	console.log($scope.currentPresentation);

}]);

