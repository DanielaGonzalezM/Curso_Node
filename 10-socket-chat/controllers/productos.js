const { response } = require("express")
const { Producto } = require("../models")

//ObtenerProductos - paginado - total - populate
const obtenerProductos = async (req, res = response) => {
    const { limit = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [productos, total] = await Promise.all([
        Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .limit(Number(limit))
            .skip(Number(desde)),
        Producto.countDocuments(query)
    ]);

    res.json({
        total,
        productos
    });
}

//ObtenerProducto - populate {}
const obtenerProducto = async (req, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findById(id).populate('usuario', 'nombre');
    res.json(producto);
}

//createProducto
const crearProducto = async (req, res = response) => {
    const { estado, usuario, ...body } = req.body;
    const nombre = body.nombre.toUpperCase();
    const productoDB = await Producto.findOne({ nombre });

    if (productoDB) {
        return res.status(400).json({ msg: `El producto ${productoDB.nombre}, ya existe` });
    }

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }
    const producto = new Producto(data);
    await producto.save();
    res.status(201).json(producto);
}

//ActualizarProducto
const actualizarProducto = async (req, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;
    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

    res.json(producto);
}

//BorrarProducto - estado:false
const borrarProducto = async (req, res = response) => {
    const { id } = req.params;
    const usuarioId = req.usuario._id;
    const productoBorrado = await Producto.findByIdAndUpdate(id, { estado: false, usuario: usuarioId }, { new: true });
    res.json(productoBorrado);
}
module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
}
