
let usuario = null;
let socket = null;

const url = "http://localhost:3000/api/auth/";

//Validar token del localstorage
const validarJWT = async () => {
    const token = localStorage.getItem("token") || "";
    if (token.length <= 10) {
        window.location = "index.html";
        throw new Error("No hay token en el servidor");
    }

    const resp = await fetch(url, {
        method: "GET",
        headers: {
            "x-token": token,

        }
    });

    const { usuario: userDB, token: tokenDB } = await resp.json();
    localStorage.setItem("token", tokenDB);
    usuario = userDB;
    document.title = usuario.nombre;
    await conectarSocket();
}

const conectarSocket = () => {
    const socket = io({
        "extraHeaders":{
            "x-token": localStorage.getItem("token")
        }
    });


}

const main = async () => {

    await validarJWT();

}

main();
//const socket = io();
