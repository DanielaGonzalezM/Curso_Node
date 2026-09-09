const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT, esAdminRole } = require("../middlewares");
const {
    actualizarProducto,
    borrarProducto,
    crearProducto,
    obtenerProducto,
    obtenerProductos,
} = require("../controllers/productos");
const { existeCategoriaPorId, existeProductoPorId } = require("../helpers/db-validators");

const router = Router();

//Obtener todas las productos - publico
router.get('/', (req, res) => {
    obtenerProductos(req, res)
})

//Obtener un producto por id - publico
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], (req, res) => {
    obtenerProducto(req, res)
})

//Crear producto - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un ID válido').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], (req, res) => {
    crearProducto(req, res)
})

//Actualizar - privado - cualquiera con token válido
router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('categoria', 'No es un ID válido').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    check('id').custom(existeProductoPorId),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], (req, res) => {
    actualizarProducto(req, res)
})

//Borrar - privado - cualquiera con token válido
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], (req, res) => {
    borrarProducto(req, res)
})


module.exports = router;
