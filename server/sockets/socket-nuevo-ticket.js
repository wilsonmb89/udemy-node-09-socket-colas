const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {
  console.log('Usuario conectado');
  client.on('pedirTicket', (data, callback) => {
    const ticket = ticketControl.generarTicket();
    callback({ responseTicket: ticket });
    client.broadcast.emit('nuevoTicket', { ticket });
  });
  client.on('ultimoTicket', (data, callback) => {
    callback({ actual: `Ticket ${ticketControl.ultimo}`});
  });
  client.on('obtenerUltimos4', (data, callback) => {
    callback({ ultimos4: ticketControl.ultimos4 });
  });
  client.on('atenderTicket', (data, callback) => {
    const escritorio = data.escritorio;
    const ticketAtendido = ticketControl.atenderTicket(escritorio);
    callback( ticketAtendido );
    client.broadcast.emit('ticketAtendido', { ultimos4: ticketControl.ultimos4 });
  });
});