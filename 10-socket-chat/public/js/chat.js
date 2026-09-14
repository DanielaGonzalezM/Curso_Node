
let usuario = null;
let socket = null;

const url = "http://localhost:3000/api/auth/";

//Referenciaas HTML
const txtUid = document.getElementById("txtUid");
const txtMensaje = document.getElementById("txtMensaje");
const ulUsuarios = document.getElementById("ulUsuarios");
const ulMensajes = document.getElementById("ulMensajes");
const btnSalir = document.getElementById("btnSalir");
const dotEstadoServidor = document.getElementById("dotEstadoServidor");
const txtEstadoServidor = document.getElementById("txtEstadoServidor");



//Validar token del localstorage

const limpiarYRedireccionar = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location = "index.html"
}

const validarJWT = async () => {
    const token = localStorage.getItem("token") || "";
    if (token.length <= 10) {
        window.location = "index.html";
        throw new Error("No hay token en el servidor");
    }


    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "x-token": token,
            }
        });

        const data = await response.json();
        const { msg, token: tokenDB, usuario: userDB } = data;


        if (msg && !userDB) {
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            console.error(msg);
            limpiarYRedireccionar();
            return;
        }

        localStorage.setItem("token", tokenDB || token);
        localStorage.setItem("email", userDB.correo);

        let usuario = userDB;
        document.title = usuario.nombre;

        await conectarSocket();

    } catch (err) {
        console.log(err);
        limpiarYRedireccionar();

    }

}

const conectarSocket = () => {
    socket = io({
        "extraHeaders": {
            "x-token": localStorage.getItem("token")
        }
    });

    socket.on("connect", () => {
        console.log("Socket online");
        dotEstadoServidor.classList.add("online");
        txtEstadoServidor.textContent = "Servidor online";
    })

    socket.on("disconnect", () => {
        console.log("Socket offline");
        dotEstadoServidor.classList.remove("online");
        txtEstadoServidor.textContent = "Servidor offline";
    })

    socket.on("recibir-mensajes", (payload) => {
        console.log(payload);
    });

    socket.on("usuarios-activos", dibujarUsuarios);

    socket.on("mensajes-privado", () => {
        //TODO:
    });



}

const dibujarUsuarios = (usuarios = []) => {
    let usersHtml = "";
    usuarios.forEach(user => {
        usersHtml += `
        <li>
            <p>
                <h5 class= "text-success"> ${user.nombre} </h5>
                <span class="fs-6 text-muted">${user.uid}</span>
            </p>
        </li>
        `
    });

    ulUsuarios.innerHTML = usersHtml;
}


txtMensaje.addEventListener("keyup", ({ keyCode }) => {
    const mensaje = txtMensaje.value;
    const uid = txtMensaje.value;

    if (keyCode !== 13) { return; }
    if (mensaje.length === 0) { return; }

    socket.emit("enviar-mensaje", { mensaje, uid });

    txtMensaje.value="";


});

const main = async () => {

    await validarJWT();

}

main();
//const socket = io();
