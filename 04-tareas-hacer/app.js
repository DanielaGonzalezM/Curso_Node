require("colors");
const { mostrarMenu, pausa } = require("./helpers/mensajes");

// console.clear();
const main = async () => {
  let opt = "test";
  do {
    opt = await mostrarMenu();
    console.log({ opt });
    if (opt !== "0") await pausa();
  } while (opt !== "0");
};

main();
