const path = require("path");
const fs = require("fs");

const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { response } = require("express");
const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require("../models");


const cargarArchivo = async (req, res = response) => {

    try {
        const pathCompleto = await subirArchivo(req.files, undefined, "imgs");
    } catch (error) {
        return res.status(400).json({ msg: error });
    }

    res.json({
        msg: "Archivo cargado correctamente",
        path: pathCompleto.nombre
    });

}

//legacy (antes de cloudinary)
const actualizarImagen = async (req, res = response) => {

    const { coleccion, id } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No existe un usuario con el id ${id}` });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No existe un producto con el id ${id}` });
            }
            break;
        default:
            return res.status(500).json({ msg: "Se me olvidó validar esto" });
    }

    //Limpiar imágenes previas
    if (modelo.img) {
        //Hay que borrar la imagen del servidor
        const pathImg = path.join(__dirname, `../uploads/${coleccion}/${modelo.img}`);
        if (fs.existsSync(pathImg)) {
            fs.unlinkSync(pathImg);
        }
    }

    const resp = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = resp.nombre;
    await modelo.save();

    res.json({
        msg: "Archivo cargado correctamente",
        modelo: modelo,
    });
}

const actualizarImagenCloudinary = async (req, res = response) => {

    const { coleccion, id } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No existe un usuario con el id ${id}` });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No existe un producto con el id ${id}` });
            }
            break;
        default:
            return res.status(500).json({ msg: "Se me olvidó validar esto" });
    }

    //Limpiar imágenes previas
    if (modelo.img) {
        //Hay que borrar la imagen del servidor
        const public_id = modelo.img.split('/').pop().split('.')[0];
        cloudinary.uploader.destroy(`${coleccion}/${public_id}`);
    }

    const { secure_url } = await cloudinary.uploader.upload(req.files.archivo.tempFilePath, { folder: coleccion });
    modelo.img = secure_url;
    await modelo.save();

    res.json({
        msg: "Archivo cargado correctamente",
        modelo: modelo,
    });
}

const mostrarImagen = async (req, res = response) => {

    const { coleccion, id } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No existe un usuario con el id ${id}` });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No existe un producto con el id ${id}` });
            }
            break;
        default:
            return res.status(500).json({ msg: "Se me olvidó validar esto" });
    }
    if (modelo.img) {

        const pathImg = path.join(__dirname, `../uploads/${coleccion}/${modelo.img}`);
        if (fs.existsSync(pathImg)) {
            return res.sendFile(pathImg);
        }
    }

    return res.sendFile(path.join(__dirname, `../assets/no-image.jpg`));
}

const mostrarImagenCloudinary = async (req, res = response) => {

    const { coleccion, id } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No existe un usuario con el id ${id}` });
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No existe un producto con el id ${id}` });
            }
            break;
        default:
            return res.status(500).json({ msg: "Se me olvidó validar esto" });
    }
    if (modelo.img) {
        return res.redirect(modelo.img);
    }

    return res.sendFile(path.join(__dirname, `../assets/no-image.jpg`));
}





module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary,
    mostrarImagenCloudinary,
}
