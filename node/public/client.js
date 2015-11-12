/*global io*/
var socket = io();

/**
 * Envoi d'un message
 */
socket.emit('slidEvent','salut');
