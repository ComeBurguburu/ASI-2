/*global io*/
var socket = io.connect();

/**
 * Envoi d'un message
 */
socket.emit('slidEvent','salut');
socket.on('connection',function(msg){alert(msg);});
