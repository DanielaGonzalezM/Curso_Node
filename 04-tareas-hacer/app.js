require("colors");
const { inquirerMenu, pausa } = require("./helpers/inquirer");
const Tarea = require("./models/tarea");
const Tareas = require("./models/tareas");

const main = async () => {
  let opt = "test";
  do {
    opt = await inquirerMenu();
    console.log({ opt });
    // const tareas = new Tareas();
    // const tarea = new Tarea("comprar comida");
    // tareas._listado[tarea.id] = tarea;
    // console.log(tareas);

    if (opt !== "0") await pausa();
  } while (opt !== "0");
};

main();
