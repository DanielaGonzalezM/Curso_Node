const { type } = require("os");
const { argv } = require("yargs");
const { crearArchivo } = require("./helpers/multiplicar");

console.clear();
// console.log(process.argv);
// console.log(argv.b);
// console.log(argv.l);

// const [, , arg3 = "base=5"] = process.argv;
// const [, base = 5] = arg3.split("=");

crearArchivo(argv.b, argv.l)
  .then((nombreArchivo) => console.log(nombreArchivo, "creado"))
  .catch((err) => console.log(err));
