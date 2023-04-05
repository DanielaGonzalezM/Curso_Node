const fs = require("fs");
const color = require("colors");

const crearArchivo = async (base = 5, listar = false) => {
  try {
    let salida = "";
    const nombreTxt = `tabla-${base}.txt`;
    for (let index = 1; index <= 10; index++) {
      salida += `${base} ${"x".green} ${index} ${"=".green} ${base * index} \n`;
    }
    if (listar) {
      console.log("============================".green);
      console.log("         Tabla del ".green, color.blue(base));
      console.log("============================".green);
      console.log(salida);
    }
    fs.writeFileSync(nombreTxt, salida);
    return nombreTxt;
  } catch (error) {
    throw error;
  }
};

module.exports = { crearArchivo };
