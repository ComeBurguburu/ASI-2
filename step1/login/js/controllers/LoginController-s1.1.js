angular.module('loginApp',[]).controller('loginCtrl',loginCrtFnt);
loginCrtFnt.$inject=['$scope','$log'];
function loginCrtFnt($scope, $log){
	$scope.logAuth = function() {
		$log.info('user login:', $scope.user.login);
		$log.info('user pwd:', $scope.user.pwd);
	};
	$scope.logAuthObject = function(user) {
		$log.info('user object login:', user.login);
		$log.info('user object pwd:', user.pwd);
	};

}
