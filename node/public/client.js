/*global io*/
var socket = io.connect();

/**
 * Envoi d'un message
 */
socket.emit('slidEvent','salut');
<<<<<<< HEAD
socket.on('open',function(){alert("ready");});
socket.on('connection',function(){alert("ready");});
=======
<<<<<<< Updated upstream
<<<<<<< Updated upstream
socket.on('connection',function(msg){alert(msg);});
=======
socket.on('connection',function(){alert("ready");});
>>>>>>> Stashed changes
=======
socket.on('connection',function(){alert("ready");});
>>>>>>> Stashed changes
>>>>>>> c5249e464dbd46c8312cd20300007d36e6dc02e1
