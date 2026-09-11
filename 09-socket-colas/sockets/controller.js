

const TicketsControl = require("../models/ticket-control");
const ticketsControl = new TicketsControl();

const socketController = (socket) => {

    socket.emit('ultimo-ticket', ticketsControl.ultimo );

    socket.on('siguiente-ticket', ( payload, callback ) => {
        const siguiente = ticketsControl.siguiente();
        callback(siguiente);
        //TODO: Notificar que hay un nuevo ticket pendiente de atender
    })

}



module.exports = {
    socketController
}
