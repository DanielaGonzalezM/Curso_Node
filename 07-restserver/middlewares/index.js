const validarArchivo = require("../middlewares/validar-archivo");
const validarCampos = require("../middlewares/validar-campos");
const validarJWT = require("../middlewares/validar-jws");
const validaRoles = require("../middlewares/validar-roles");

module.exports = {
    ...validarArchivo,
    ...validarCampos,
    ...validarJWT,
    ...validaRoles,
}
