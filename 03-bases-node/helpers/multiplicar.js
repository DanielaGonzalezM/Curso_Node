const fs = require("fs");
const color = require("colors");

const crearArchivo = async (base = 5, listar = false, hasta = 10) => {
  try {
    let salida,
      consola = "";
    const nombreTxt = `./salida/tabla-${base}.txt`;
    for (let index = 1; index <= hasta; index++) {
      salida += `${base} x ${index} = ${base * index} \n`;
      consola += `${base} ${"x".green} ${index} ${"=".green} ${
        base * index
      } \n`;
    }
    if (listar) {
      console.log("============================".green);
      console.log("         Tabla del ".green, color.blue(base));
      console.log("============================".green);
      console.log(consola);
    }
    fs.writeFileSync(nombreTxt, salida);
    return nombreTxt;
  } catch (error) {
    throw error;
  }
};

module.exports = { crearArchivo };
