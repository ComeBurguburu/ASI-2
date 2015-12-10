angular.module('loginApp').controller('loginCtrl', ['$scope', '$log', '$window', 'auth', function loginCrtFnt($scope, $log, $window, auth) {
	var login = 'index';
	$scope.logAuth = function () {
		$log.info('user login', $scope.user.login);
		$log.info('user pwd', $scope.user.pwd);
	};

	$scope.logAuthObject = function (user) {

		$log.info('user login', user.login);
		$log.info('user pwd', user.pwd);
	};
	$scope.listUser = function () {
		auth.userList();
	};
	$scope.checkUser = function (user) {
		if (!user) {
			$.scope.error = "all fileds are required";
		}

		var promise = auth.authAsk(user.login, user.pwd);

		promise.then(function () {

			if (promise.$$state.value == "SuccessAdmin") {
				$window.location.href = "admin/";
			}
			if (promise.$$state.value == "SuccessWatcher") {
				$window.location.href = "watch/";
			}


		}, function () {
			$scope.error = promise.$$state.value;

		});

	}

}]);