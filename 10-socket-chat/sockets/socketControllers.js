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

    io.emit("usuarios-activos", chatMensajes.usuariosArr);
};



module.exports = {
    socketController
}
