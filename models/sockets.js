const TicketList = require("./ticket-list");


class Sockets {

    constructor( io ) {

        this.io = io;
        this.ticketList = new TicketList();
        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

            console.log("cliente conectado")
            socket.on('request-ticket', (data, callback) => {
                const newTicket = this.ticketList.createTicket();
                callback(newTicket)
                console.log("new ticket backend")
            });

            socket.on('next-ticket-to-work' , ({agent, desk}, callback) =>{
                const ticket = this.ticketList.assignTicket(agent, desk);
                callback(ticket);

                this.io.emit( 'assigned-ticket', this.ticketList.last13);
            });

        });
    }


}


module.exports = Sockets;