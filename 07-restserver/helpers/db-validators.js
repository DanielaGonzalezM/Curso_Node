const Categoria = require("../models/categoria");
const Producto = require("../models/productos");
const Role = require("../models/role");
const Usuario = require("../models/usuario");

const esRoleValido = async (rol = "") => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
};

const emailExiste = async (correo = "") => {
    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo: ${correo}, ya está registrado`);
    }
};

const existeUsuarioPorId = async (id) => {
    // Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El id no existe ${id}`);
    }
};

const existeCategoriaPorId = async (id) => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`El id no existe ${id}`);
    }
};

const existeProductoPorId = async (id) => {
    console.log(id)
    const existeProducto = await Producto.findById(id);
    console.log(existeProducto)
    if (!existeProducto) {
        throw new Error(`El id no existe ${id}`);
    }
};

const validarColeccionesPermitidas = (coleccion = "", colecciones = []) => {
    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La colección ${coleccion} no es permitida, ${colecciones}`);
    }
    return true;
}

module.exports = {
    emailExiste,
    esRoleValido,
    existeCategoriaPorId,
    existeProductoPorId,
    existeUsuarioPorId,
    validarColeccionesPermitidas,
};
