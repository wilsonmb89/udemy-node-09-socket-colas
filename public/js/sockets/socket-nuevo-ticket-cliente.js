const socket = io();
var lblNuevoTicket = $('#lblNuevoTicket');
socket.on('connect', function() {
    console.log('Conectado al servidor');
});
socket.on('disconnect', function() {
    console.log('Conexión perdida con el servidor');
});
socket.on('nuevoTicket', function(data) {
    lblNuevoTicket.text(data.ticket);
});
socket.emit('ultimoTicket', {}, function(data) {
    lblNuevoTicket.text(data.actual);
});

$(document).ready(function() {
    $('#btn-generar-ticket').on('click', function() {
        socket.emit('pedirTicket', {}, function(data) {
            lblNuevoTicket.text(data.responseTicket);
        });
    });
});
