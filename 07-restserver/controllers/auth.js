const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");
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

        res.json({
            msg: "login ok",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el administrador",
        });
    }
};
module.exports = { login };
