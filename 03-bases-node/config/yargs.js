const argv = require("yargs")
  .option("b", {
    alias: "base",
    type: "number",
    demandOption: true,
    describe: "base de tabla de multiplicar",
  })
  .option("l", {
    alias: "listar",
    type: "boolean",
    demandOption: true,
    default: false,
    describe: "Muestra tabla por consola",
  })
  .check((argv, options) => {
    console.log("yargs", argv);
    if (isNaN(argv.b)) {
      throw "La base debe ser un número";
    }
    return true;
  }).argv;

module.exports = argv;
