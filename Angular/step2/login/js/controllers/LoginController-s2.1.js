angular.module('loginApp').controller('loginCtrl', ['$scope','$log','$window', 'auth', function loginCrtFnt($scope, $log, $window, auth){
var login='index';
 $scope.logAuth = function() {
	 $log.info('user login', $scope.user.login);
	 $log.info('user pwd', $scope.user.pwd);
 };

 $scope.logAuthObject = function(user) {

	$log.info('user login',user.login);
 	$log.info('user pwd', user.pwd);
 	// document.write(document.getElementById('form-password').pwd);

 };
 $scope.listUser = function() {
  	auth.userList();	
 	// document.write(document.getElementById('form-password').pwd);
 };
 $scope.checkUser= function(user) {
 	login=auth.checkUser(user.login, user.pwd);
 	if(login=="success") {
 		$window.location.href= "loginSuccess.html";
 	}
 	else {
 		$window.location.href= "index.html";
 	}

 	
 }

}]);

