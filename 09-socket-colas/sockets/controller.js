

const TicketsControl = require("../models/ticket-control");
const ticketsControl = new TicketsControl();

const socketController = (socket) => {

    socket.on('enviar-mensaje', ( payload, callback ) => {

        const id = 123456789;
        callback( id );

        socket.broadcast.emit('enviar-mensaje', payload );

    })

}



module.exports = {
    socketController
}
