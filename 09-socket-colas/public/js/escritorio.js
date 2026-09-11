// Referencias del HTML
const lblEscritorio = document.querySelector('#lblEscritorio')
const btnAtender = document.querySelector('#btnAtender')

const searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}


const escritorio = searchParams.get('escritorio')
lblEscritorio.innerText = "Escritorio " + escritorio




const socket = io();



socket.on('connect', () => {
    btnAtender.disabled = false;
});

socket.on('disconnect', () => {
    btnAtender.disabled = true;
});

socket.on('ultimo-ticket', (ultimoticket)=>{
       // lblNuevoTicket.innerText = 'Ticket ' + ultimoticket;
});

btnAtender.addEventListener( 'click', () => {

    //socket.emit('siguiente-ticket', null, ( ticket ) => {
    //    lblNuevoTicket.innerText = ticket;
    //});

});
