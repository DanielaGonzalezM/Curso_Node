const validarArchivo = require("./validar-archivo");
const validarCampos = require("./validar-campos");
const validarJWT = require("./validar-jws");
const validaRoles = require("./validar-roles");

module.exports = {
    ...validarArchivo,
    ...validarCampos,
    ...validarJWT,
    ...validaRoles,
}
