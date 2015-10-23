$.post("WatcherAuth",{
	auth: JSON.stringify({login: "test","pwd":"pwd"})
},function(response){alert(response);});