var io = require('socket.io');

var controller = function(){};



	controller.listen = function(server){
	
					var ioServer = io.listen(server);
	
					ioServer.on('connection', function (socket) {
					  /**
					   * Log de connexion et de déconnexion des utilisateurs
					   */
					   socket.emit('connection','I\'m ready');

					  console.log('a user connected');
				
					socket.on('slidEvent',function(){
						console.log("slidEvent received");
					});

					socket.on('data_comm',function(err,data){
						
					});
				})
	};
module.exports = controller;
