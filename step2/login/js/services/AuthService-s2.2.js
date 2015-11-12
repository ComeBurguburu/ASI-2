angular.module('authService', []).service('auth',  ['$log','$http','$q', function authFnc($log,$http,$q) {
	var userMap={};
	userMap['jdoe']=['jdoepwd','watcher'];
	//console.log(userMap['jdoe'][1]);
	userMap['psmith']= ['psmithpwd','watcher'];
	userMap['tp']=['tp','admin'];
	//console.log("bonjour");
	var fncContainer={
		localAuthAsk:localAuthAsk,
		checkUser: checkUser,
		userList: userList,
		authAsk: authAsk

	};

	function localAuthAsk(login,pwd){
		var deferred = $q.defer();

		var interval = setInterval(function(login,pwd,deferred){
			//console.log(userMap[login]);
		if( userMap[login][0]==pwd){

			if(userMap[login][1] == "watcher") {
	 			deferred.resolve('SuccessWatcher');
	 		}
	 		if(userMap[login][1] == "admin") {
	 			deferred.resolve('SuccessAdmin');
	 		}
			
		}
		else {
		
		deferred.reject('Error');
		}

		//console.log(this);

		clearInterval(interval);
		},3000,login,pwd,deferred);
		console.log(deferred.promise);
		return deferred.promise;	
	};

	//mettre tout le dossier dans wamp!!!
	function authAsk(login,pwd){        
	 	var deferred = $q.defer();          
	 	$http.post('http://localhost/fakeAuthWatcher/',{'login':login,'pwd':pwd}).
	 		success(function(data, status, headers, config) {             
	 			
	 			if(userMap[login][1] == "watcher") {
	 					deferred.resolve('SuccessWatcher');
		 		}
		 		if(userMap[login][1] == "admin") {
		 				deferred.resolve('SuccessAdmin');
		 		} 

	        }).         
	        error(function(data, status, headers, config) {             
	        //TODO    
	         
	        deferred.reject('Error');    
	           
	        });         
	    return deferred.promise;      
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