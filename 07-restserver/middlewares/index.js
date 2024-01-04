const validarJWT = require("../middlewares/validar-jws");
const validaRoles = require("../middlewares/validar-roles");
const validarCampos = require("../middlewares/validar-campos");

module.exports = {
    ...validarCampos,
    ...validaRoles,
    ...validarJWT,
}