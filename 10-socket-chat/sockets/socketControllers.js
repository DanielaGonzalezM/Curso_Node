const { Socket } = require("socket.io");
const { comprobarJWT } = require("../helpers");
const { ChatMensajes } = require("../models")

const chatMensajes = new ChatMensajes();

const socketController = async (socket = new Socket, io) => {
    const token = socket.handshake.headers["x-token"];
    const usuario = await comprobarJWT(token);
    if (!usuario) {
        return socket.disconnect();
    }

    //Conectar al usuario
    chatMensajes.conectarUsuario(usuario);

    //desconectar usuario
    socket.on("disconnect", () => {
        chatMensajes.desconectarUsuario(usuario.id);
        chatMensajes.conectarUsuario(usuario);
    })

    socket.on("enviar-mensaje",({uid,mensaje})=>{
        console.log({uid,mensaje})
        chatMensajes.enviarMensaje(usuario.id,usuario.nombre,mensaje);
        io.emit("recibir-mensajes", chatMensajes.ultimos10);

    })

    io.emit("usuarios-activos", chatMensajes.usuariosArr);
};



module.exports = {
    socketController
}
