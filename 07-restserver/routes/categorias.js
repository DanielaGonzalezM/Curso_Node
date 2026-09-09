const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares");
const { crearCategoria } = require("../controllers/categorias");

const router = Router();

//Obtener todas las categorías - publico
router.get('/',(req,res)=>{
    res.json('OK')
})

//Obtener una categoría por id - publico
router.get('/:id',(req,res)=>{
    res.json('OK')
})

//Crear categoría - privado - cualquier persona con un token válido
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],(req,res)=>{
    crearCategoria(req,res)
})

//Actualizar - privado - cualquiera con token válido
router.put('/:id',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],(req,res)=>{
    res.json('OK')
})

//Borrar - privado - cualquiera con token válido
router.delete('/:id',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],(req,res)=>{
    res.json('OK')
})


module.exports = router;
