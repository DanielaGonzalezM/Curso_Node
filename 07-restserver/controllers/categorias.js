const { response } = require("express")
const { Categoria } = require("../models")

//ObtenerCategorias - paginado - total - populate
const obtenerCategorias = async (req, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [categorias, total] = await Promise.all([
        Categoria.find(query)
            .populate('usuario', 'nombre')
            .limit(Number(limite))
            .skip(Number(desde)),
        Categoria.countDocuments(query)
    ]);

    res.json({
        total,
        categorias
    });
}

//ObtenerCategoria - populate {}
const obtenerCategoria = async (req, res = response) => {
    const { id } = req.params;
    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');
    res.json(categoria);
}

//CrearCategoria
const crearCategoria = async (req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({ nombre });

    if (categoriaDB) {
        return res.status(400).json({ msg: "La categoría ya existe" });
    }

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);
    await categoria.save();

    res.status(201).json(categoria);

}

//ActualizarCategoria
const actualizarCategoria = async (req, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

    res.json(categoria);
}

//BorrarCategoria - estado:false
const borrarCategoria = async (req, res = response) => {
    const { id } = req.params;
    const usuarioId = req.usuario._id;
    const categoria = await Categoria.findByIdAndUpdate(id, { estado: false, usuario: usuarioId }, { new: true });

    res.json(categoria);
}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}
