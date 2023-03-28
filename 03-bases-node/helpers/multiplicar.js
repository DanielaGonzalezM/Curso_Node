const fs = require("fs");

const crearArchivo = async (base = 5) => {
  try {
    console.log("============================");
    console.log("         Tabla del ", base);
    console.log("============================");
    let salida = "";
    const nombreTxt = `tabla-${base}.txt`;
    for (let index = 1; index <= 10; index++) {
      salida += `${base} x ${index} = ${base * index} \n`;
    }
    console.log(salida);
    fs.writeFileSync(nombreTxt, salida);
    return nombreTxt;
  } catch (error) {
    throw error;
  }
};

module.exports = { crearArchivo };
