angular.module('loginApp',['$auth']).controller('loginCtrl',loginCrtFnt);
loginCrtFnt.$inject=['$scope','$log','$auth'];
function loginCrtFnt($scope, $log,$auth){
	$scope.logAuth = function() { // Fonction sans paramètres qui s'appuie sur le scope
		$log.info('user login:', $scope.user.login);
		$log.info('user pwd:', $scope.user.pwd);
	};
	$scope.logAuthObject = function(user) { // Fonction avec paramètre qui affiche les propriétes de l'objet passé en paramètre
		$log.info('user object login:', user.login);
		$log.info('user object pwd:', user.pwd);
	};
}
