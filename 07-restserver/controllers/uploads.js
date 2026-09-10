const { response } = require("express");
const { subirArchivo } = require("../helpers");

const cargarArchivo = async (req, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ msg: "No hay archivos que subir" });
    }

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

module.exports = {
    cargarArchivo
}
