const { actualizarImagen, mostrarImagen, cargarArchivo, actualizarImagenCloudinary, mostrarImagenCloudinary } = require("../controllers/uploads");
const { check } = require("express-validator");
const { Router } = require("express");
const { validarCampos,validarArchivoSubir } = require("../middlewares");
const { validarColeccionesPermitidas } = require("../helpers/db-validators");

const router = Router();

router.post("/",validarArchivoSubir, cargarArchivo);

router.put("/:coleccion/:id", [
validarArchivoSubir,
check('id', 'No es un ID válido').isMongoId(),
check('coleccion').custom((c) => validarColeccionesPermitidas(c, ["usuarios", "productos"])),
validarCampos,
//], actualizarImagen);
], actualizarImagenCloudinary);

router.get("/:coleccion/:id", [
check('id', 'No es un ID válido').isMongoId(),
check('coleccion').custom((c) => validarColeccionesPermitidas(c, ["usuarios", "productos"])),
validarCampos,
//], mostrarImagen);
], mostrarImagenCloudinary);

module.exports = router;
