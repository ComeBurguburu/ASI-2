/*global io*/
var socket = io.connect();
/**
 * Envoi d'un message
 */
socket.emit('slidEvent',JSON.stringify({CMD:"START","PRES_ID": "37ba76b1-5c5d-47ef-8350-f4ea9407276d"}));
