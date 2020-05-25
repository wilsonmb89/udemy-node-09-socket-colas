const socket = io();
socket.on('connect', function() {
  console.log('Conectado al servidor');
});
socket.on('disconnect', function() {
  console.log('Conexión perdida con el servidor');
});
socket.emit('obtenerUltimos4', {}, function(data) {
  mostrarUltimos(data.ultimos4);
});
socket.on('ticketAtendido', async function(data) {
  const audio = new Audio('audio/new-ticket.mp3');
  await audio.play()
  mostrarUltimos(data.ultimos4);
});

function mostrarUltimos(ultimos) {
  for(let x = 0; x < ultimos.length; x++){
    let ultimo = ultimos[x];
    $('#lblTicket' + (x + 1)).text('Ticket ' + ultimo.numero);
    $('#lblEscritorio'+ (x + 1)).text('Escritorio ' + ultimo.escritorio);
  }
}