/*global io*/
var socket = io.connect();

/**
 * Envoi d'un message
 */
socket.emit('slidEvent','salut');
<<<<<<< Updated upstream
<<<<<<< Updated upstream
socket.on('connection',function(msg){alert(msg);});
=======
socket.on('connection',function(){alert("ready");});
>>>>>>> Stashed changes
=======
socket.on('connection',function(){alert("ready");});
>>>>>>> Stashed changes
