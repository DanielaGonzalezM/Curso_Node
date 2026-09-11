// Referencias del HTML
const lblEscritorio = document.querySelector('#lblEscritorio');
const btnAtender = document.querySelector('#btnAtender');
const lblTicket = document.querySelector('#lblTicket');
const divAlerta = document.querySelector('#divAlerta');

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}


const escritorio = searchParams.get('escritorio')
lblEscritorio.innerText = "Escritorio " + escritorio


divAlerta.style.display = 'none';

const socket = io();



socket.on('connect', () => {
    btnAtender.disabled = false;
});

socket.on('disconnect', () => {
    btnAtender.disabled = true;
});

socket.on('ultimo-ticket', (ultimoticket) => {
    // lblNuevoTicket.innerText = 'Ticket ' + ultimoticket;
});

btnAtender.addEventListener('click', () => {
    socket.emit('atender-ticket', { escritorio }, ({ ok, ticket }) => {
        if (!ok) {
            lblTicket.innerText = 'Nadie';
            return divAlerta.style.display = '';

        }
        console.log(ticket)
        lblTicket.innerText = 'Ticket ' + ticket.numero
    });

});
