const {response} = require('express');
const { ObjectId } = require('mongoose').Types;
const { Usuario, Categoria, Producto, Role } = require('../models');

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
]

const buscarUsuario = async (termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino); //True

    if (esMongoId) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        });
    }else {
        const regex = new RegExp(termino, 'i');
        const usuarios = await Usuario.find({
            $or: [{ nombre: regex }, { correo: regex }],
            $and: [{ estado: true }]
        });
        return res.json({
            results: usuarios
        });
    }
}

const buscarCategoria = async (termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino); //True
    if (esMongoId) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : []
        });
    }else {
        const regex = new RegExp(termino, 'i');
        const categorias = await Categoria.find({ nombre: regex, estado: true });
        return res.json({
            results: categorias
        });
    }
}

const buscarProducto = async (termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino); //True
    if (esMongoId) {
        const producto = await Producto.findById(termino);
        return res.json({
            results: (producto) ? [producto] : []
        });
    }else {
        const regex = new RegExp(termino, 'i');
        const productos = await Producto.find({ nombre: regex, estado: true });
        return res.json({
            results: productos
        });
    }
}

const buscarRole = async (termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino); //True
    if (esMongoId) {
        const role = await Role.findById(termino);
        return res.json({
            results: (role) ? [role] : []
        });
    }else {
        const regex = new RegExp(termino, 'i');
        const roles = await Role.find({ rol: regex });
        return res.json({
            results: roles
        });
    }
}


const buscar = (req, res = response) => {
    // Implementation for searching
    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        });
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuario(termino, res);
            break;
        case 'categorias':
            buscarCategoria(termino, res);
            break;
        case 'productos':
            buscarProducto(termino, res);
            break;
        case 'roles':
            buscarRole(termino, res);
            break;
        default:
            return res.status(500).json({
                msg: 'Se me olvidó hacer esta búsqueda'
            });
    }

}


module.exports = {
    buscar
}
