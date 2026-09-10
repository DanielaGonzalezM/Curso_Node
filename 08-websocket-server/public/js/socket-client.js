
//referencias del HTML
const lblOnline = document.querySelector("#lblOnline");
const lblOffline = document.querySelector("#lblOffline");
const lblOnlineText = document.querySelector("#lblOnlineText");
const lblOfflineText = document.querySelector("#lblOfflineText");
const txtMensaje = document.querySelector("#txtMensaje");
const btnEnviar = document.querySelector("#btnEnviar");


const socket = io();

socket.on("connect", () => {
    lblOffline.classList.add("d-none");
    lblOfflineText.classList.add("d-none");
    lblOnline.classList.remove("d-none");
    lblOnlineText.classList.remove("d-none");
});

socket.on("disconnect", () => {
    lblOffline.classList.remove("d-none");
    lblOfflineText.classList.remove("d-none");
    lblOnline.classList.add("d-none");
    lblOnlineText.classList.add("d-none");
});

btnEnviar.addEventListener("click", () => {
    const mensaje = txtMensaje.value;
    const payload = {
         mensaje,
        id: "123ABC",
        fecha: new Date().getTime()
        };
    socket.emit("enviar-mensaje", payload, (id) => {
        console.log("Desde el server", id);
    });
});

socket.on("enviar-mensaje", (payload) => {
    console.log(payload);
});
