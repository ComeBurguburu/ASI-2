angular.module('authService', []).service('auth',  ['$log','$http','$q', function authFnc($log,$http,$q) {
	var userMap={};
	userMap['jdoe']=['jdoepwd','watcher'];
	//console.log(userMap['jdoe'][1]);
	userMap['psmith']= ['psmithpwd','watcher'];
	userMap['tp']=['tp','admin'];
	//console.log("bonjour");
	var fncContainer={
		checkUser: checkUser,
		userList: userList
	};

	function checkUser(userlogin,userpwd){
	 	var login = "false";
	 	for (var name in userMap ) {
	  		if (name==userlogin && userMap[name][0]==userpwd)
	  		{
	  			login="success";
	  			return login;
	  		}
		}
		login="false";
	  	return login;
 	};

	function userList(){
	 	for (var name in userMap ) {
	  		$log.info('user login',name);
		}
	};

	return fncContainer;
}]);