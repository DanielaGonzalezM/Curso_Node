const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");
const login = async (req, res = response) => {
    const { correo, password } = req.body;

    try {
        //Todo:Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - correo",
            });
        }
        //Todo:Si el usuario está activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - estado: false",
            });
        }
        //Todo:Verificar la password
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - password",
            });
        }
        //Todo:Generar el JWT
        const token = await generarJWT(usuario.id);
        res.json({
            usuario,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador",
        });
    }
};

const googleSignIn = async (req, res = response) => {

    const { id_token } = req.body;
    try {
        const { nombre, img, correo } = await googleVerify(id_token);
        console.log(googleUser);
        res.json({
            msg: "Todo ok!",
            id_token
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    }

}
module.exports = { login, googleSignIn };
