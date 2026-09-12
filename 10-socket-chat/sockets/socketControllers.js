const { Socket } = require("socket.io");
const { comprobarJWT } = require("../helpers");


const socketController = async (socket = new Socket) => {
    const token = socket.handshake.headers["x-token"];
    const usuario = await comprobarJWT(token);
    if (!usuario) {
        return socket.disconnect();
    }

    console.log("Se conectó " + usuario.nombre)
};



module.exports = {
    socketController
}
