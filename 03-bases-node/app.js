const { crearArchivo } = require("./helpers/multiplicar");

console.clear();

const base = 5;
crearArchivo(base).then((nombreArchivo) =>
  console.log(nombreArchivo, "creado")
).catch(err=>console.log(err));
