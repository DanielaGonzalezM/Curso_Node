require("colors");
const { inquirerMenu } = require("./helpers/inquirer");
const { pausa } = require("./helpers/mensajes");

// console.clear();
const main = async () => {
  let opt = "test";
  do {
    opt = await inquirerMenu();
    console.log({ opt });
    if (opt !== "0") await pausa();
  } while (opt !== "0");
};

main();
