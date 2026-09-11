
// Referencias del HTML
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnAtender = document.querySelector('#btnCrear');


const socket = io();



socket.on('connect', () => {
    btnAtender.disabled = false;
});

socket.on('disconnect', () => {
    btnAtender.disabled = true;
});

socket.on('ultimo-ticket', (ultimoticket)=>{
        lblNuevoTicket.innerText = 'Ticket ' + ultimoticket;
});

btnAtender.addEventListener( 'click', () => {

    socket.emit('siguiente-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText = ticket;
    });

});
