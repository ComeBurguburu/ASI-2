/*global io*/
var socket = io.connect();
/**
 * Envoi d'un message
 */
socket.on('connection',function(msg){
		socket.emit("data_comm",{id:42});
	alert(msg);
});
socket.on('currentSlidEvent',function(msg){
	alert(msg);
});