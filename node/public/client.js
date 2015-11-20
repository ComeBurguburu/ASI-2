/*global io*/
var socket = io.connect();
/**
 * Envoi d'un message
 */
socket.emit('slidEvent',JSON.stringify({CMD:"START","PRES_ID": "2aa3a903-1471-4b8a-a272-9c6f4dfd44d7"}));
socket.on('connection',function(msg){
	socket.emmit("data_com",42);
	//socket.getId();
	alert(msg);});
