
let usuario = null;
let socket = null;
let destinatario = null; // { uid, nombre } o null = chat global

const url = "http://localhost:3000/api/auth/";

//Referencias HTML
const txtUid = document.getElementById("txtUid");
const txtMensaje = document.getElementById("txtMensaje");
const btnEnviar = document.getElementById("btnEnviar");
const ulUsuarios = document.getElementById("ulUsuarios");
const ulMensajes = document.getElementById("ulMensajes");
const btnSalir = document.getElementById("btnSalir");
const dotEstadoServidor = document.getElementById("dotEstadoServidor");
const txtEstadoServidor = document.getElementById("txtEstadoServidor");
const destinatarioNombre = document.getElementById("destinatarioNombre");
const btnLimpiarDestinatario = document.getElementById("btnLimpiarDestinatario");



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

        usuario = userDB;
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

    socket.on("recibir-mensajes", dibujarMensajes);

    socket.on("usuarios-activos", dibujarUsuarios);

    socket.on("mensajes-privado", ({ de, mensaje }) => {
        agregarMensajePrivado(de, mensaje);
    });



}

const seleccionarDestinatario = (uid, nombre) => {
    if (destinatario && destinatario.uid === uid) {
        // click de nuevo sobre el mismo usuario -> volver a chat global
        limpiarDestinatario();
        return;
    }

    destinatario = { uid, nombre };
    txtUid.value = uid;
    destinatarioNombre.textContent = nombre;
    btnLimpiarDestinatario.classList.remove("d-none");

    marcarUsuarioActivo(uid);
    txtMensaje.focus();
}

const limpiarDestinatario = () => {
    destinatario = null;
    txtUid.value = "";
    destinatarioNombre.textContent = "Todos (Chat global)";
    btnLimpiarDestinatario.classList.add("d-none");
    marcarUsuarioActivo(null);
}

const marcarUsuarioActivo = (uid) => {
    document.querySelectorAll(".usuario-item").forEach(li => {
        li.classList.toggle("activo", li.dataset.uid === uid);
    });
}

btnLimpiarDestinatario.addEventListener("click", limpiarDestinatario);

const dibujarUsuarios = (usuarios = []) => {
    const otros = usuarios.filter(u => u.uid !== usuario?.uid);

    if (otros.length === 0) {
        ulUsuarios.innerHTML = `<li class="text-muted small">No hay otros usuarios conectados</li>`;
        return;
    }

    let usersHtml = "";
    otros.forEach(user => {
        usersHtml += `
        <li class="usuario-item" data-uid="${user.uid}">
            <div>
                <div class="usuario-nombre">${user.nombre}</div>
                <div class="usuario-uid">${user.uid}</div>
            </div>
            <span class="badge bg-success rounded-pill">●</span>
        </li>
        `
    });

    ulUsuarios.innerHTML = usersHtml;

    ulUsuarios.querySelectorAll(".usuario-item").forEach(li => {
        li.addEventListener("click", () => {
            seleccionarDestinatario(li.dataset.uid, li.querySelector(".usuario-nombre").textContent);
        });
    });

    if (destinatario) {
        marcarUsuarioActivo(destinatario.uid);
    }
}

const dibujarMensajes = (mensajes = []) => {
    if (mensajes.length === 0) {
        ulMensajes.innerHTML = `<li class="text-muted small">Aún no hay mensajes...</li>`;
        return;
    }

    let mensajesHtml = "";
    mensajes.forEach(({ nombre, mensaje }) => {
        mensajesHtml += `
        <li class="mensaje-item">
            <div class="mensaje-nombre">${nombre}</div>
            <p class="mensaje-texto">${mensaje}</p>
        </li>
        `
    });

    ulMensajes.innerHTML = mensajesHtml;
    ulMensajes.scrollTop = ulMensajes.scrollHeight;
}

const agregarMensajePrivado = (de, mensaje) => {
    if (ulMensajes.querySelector(".text-muted")) {
        ulMensajes.innerHTML = "";
    }

    const li = document.createElement("li");
    li.className = "mensaje-item privado";
    li.innerHTML = `
        <div class="mensaje-nombre">${de} <span class="badge bg-warning text-dark mensaje-badge">privado</span></div>
        <p class="mensaje-texto">${mensaje}</p>
    `;
    ulMensajes.appendChild(li);
    ulMensajes.scrollTop = ulMensajes.scrollHeight;
}

const enviarMensaje = () => {
    const mensaje = txtMensaje.value.trim();
    const uid = txtUid.value;

    if (mensaje.length === 0) { return; }

    socket.emit("enviar-mensaje", { mensaje, uid });

    if (uid) {
        agregarMensajePrivado(`Tú -> ${destinatario?.nombre ?? uid}`, mensaje);
    }

    txtMensaje.value = "";
    txtMensaje.focus();
}

txtMensaje.addEventListener("keyup", ({ keyCode }) => {
    if (keyCode !== 13) { return; }
    enviarMensaje();
});

btnEnviar.addEventListener("click", enviarMensaje);

btnSalir.addEventListener("click", limpiarYRedireccionar);

const main = async () => {

    await validarJWT();

}

main();
