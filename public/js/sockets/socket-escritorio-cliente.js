const socket = io();
try {
  const searchParams = new URLSearchParams(window.location.search);
  const escritorio = searchParams.get('escritorio') || '';
  $('#small-escritorio').text(escritorio);

  socket.on('connect', function() {
    console.log('Conectado al servidor');
  });
  socket.on('disconnect', function() {
    console.log('Conexión perdida con el servidor');
  });

  $(document).ready(function() {
    $('#btn-atender-siguiente').on('click', function() {
      if (!!escritorio) {
        socket.emit('atenderTicket', { escritorio }, function(data) {
          if (!!data) {
            $('#small-ticket-atendiendo').text(`Ticket ${data.numero}`);
          } else {
            $('#small-ticket-atendiendo').text('No hay tickets por atender');
          }
        });
      }
    });
  });
} catch (err) {
  console.error(err);
}