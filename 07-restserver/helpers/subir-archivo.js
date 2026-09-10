const { v4: uuidv4 } = require("uuid");
const path = require("path");


const subirArchivo = async (files, extensionesValidas = ["png", "jpg", "jpeg", "gif"], carpeta = "") => {
    return new Promise((resolve, reject) => {
        const { archivo } = files;
        const nombreCortado = archivo.name.split(".");
        const extension = nombreCortado[nombreCortado.length - 1];

        if (!extensionesValidas.includes(extension)) {
            return reject(`La extensión ${extension} no es permitida, extensiones válidas: ${extensionesValidas}`);

        }

        const nombreTemp = `${uuidv4()}.${extension}`;
        const uploadPath = path.join(__dirname, "../uploads/", carpeta, nombreTemp);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                console.log(err);
                return reject("Error al mover el archivo");
            }

            resolve({ msg: "Archivo cargado correctamente", nombre: nombreTemp});
        });

    })
}



module.exports = {
    subirArchivo
}
