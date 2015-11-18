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

 	var promise = auth.localAuthAsk(user.login,user.pwd);

 	promise.then(function() {
 		console.log("bonjour");
 		console.log(promise);
	 	if(promise) {
	 		
	 			if(promise.$$state.value=="SuccessAdmin") {
	 				$window.location.href= "admin.html";
	 			}
	 			if(promise.$$state.value=="SuccessWatcher") {
	 				$window.location.href= "watcher.html";
	 			}
	
	 	}
	 	else {
	 		$window.location.href= "index.html";
	 	}
	 });
	// promise.then(function() {console.log("connard");});

 // 	login=auth.checkUser(user.login, user.pwd);
 // 	if(login=="success") {
 // 		var oklm=auth.localAuthAsk(user.login,user.pwd);
 // 		console.log(oklm);
 // 		if(oklm=='watcher') {
	// 		$window.location.href= "watcher.html";
	// 	}
	// 	if(oklm=='admin') {
	// 		$window.location.href= "admin.html";
	// 	}
 		
 // 	}
 // 	else {
 // 		$window.location.href= "index.html";
 // 	}
 	
 	
 }

}]);

