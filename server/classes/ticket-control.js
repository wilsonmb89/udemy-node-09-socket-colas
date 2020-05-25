const fs = require('fs');
const path = require('path');

class Ticket {
  constructor(numero, escritorio) {
    this.numero = numero;
    this.escritorio = escritorio;
  }
}

class TicketControl {

  dataPath = path.resolve(__dirname, '../data/data.json');

  constructor() {
    this.ultimo = 0;
    this.hoy = new Date().getDate();
    this.ticketsPendientes = [];
    this.ultimos4 = [];
    this.validateHoy();
    console.log('Se ha inicializado el sistema');
  }

  validateHoy() {
    const data = require(this.dataPath);
    if (this.hoy !== data.hoy) {
      this.ticketsPendientes = [];
      this.ultimos4 = [];
      this.guardarArchivo();
    } else {
      this.ticketsPendientes = data.ticketsPendientes || [];
      this.ultimos4 = data.ultimos4 || [];
      this.ultimo = data.ultimo;
    }
  }

  atenderTicket(escritorio) {
    if (this.ticketsPendientes.length > 0) {
      const ticketAtendiendo = {...this.ticketsPendientes[0]};
      this.ticketsPendientes.shift();
      ticketAtendiendo.escritorio = escritorio;
      this.ultimos4.unshift(ticketAtendiendo);
      if (this.ultimos4.length > 4) {
        this.ultimos4.pop();
      }
      this.guardarArchivo();
      return ticketAtendiendo;
    }
    return null;
  }

  generarTicket() {
    this.ultimo += 1;
    this.ticketsPendientes.push(new Ticket(this.ultimo, null));
    this.guardarArchivo();
    return `Ticket ${this.ultimo}`; 
  }

  guardarArchivo() {
    const resetDataJson = {
      ultimo: this.ultimo,
      hoy: this.hoy,
      ticketsPendientes: this.ticketsPendientes,
      ultimos4: this.ultimos4
    };
    fs.writeFileSync(this.dataPath, JSON.stringify(resetDataJson));
  }
}

module.exports = { TicketControl };