
// Referencias del HTML
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('#btnCrear');


const socket = io();



socket.on('connect', () => {
    btnCrear.disabled = false;
});

socket.on('disconnect', () => {
    btnCrear.disabled = true;
});

socket.on('ultimo-ticket', (ultimoticket)=>{
        lblNuevoTicket.innerText = 'Ticket ' + ultimoticket;
});

btnCrear.addEventListener( 'click', () => {

    socket.emit('siguiente-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText = ticket;
    });

});
