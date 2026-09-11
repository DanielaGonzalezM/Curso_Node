

const TicketsControl = require("../models/ticket-control");
const ticketsControl = new TicketsControl();

const socketController = (socket) => {

    socket.emit('ultimo-ticket', ticketsControl.ultimo);

    socket.on('siguiente-ticket', (payload, callback) => {
        const siguiente = ticketsControl.siguiente();
        callback(siguiente);
        //TODO: Notificar que hay un nuevo ticket pendiente de atender
    })

    socket.on('atender-ticket', ({ escritorio }, callback) => {
        if (!escritorio) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            });
        }
        const ticket = ticketsControl.atenderTicket(escritorio);
        if (!ticket) {
            callback({
                ok: false,
                msg: "Ya no hay tickets pendientes"
            });
        }else{
            callback({
                ok:true,
                ticket: ticket
            })
        }
    });

}



module.exports = {
    socketController
}
