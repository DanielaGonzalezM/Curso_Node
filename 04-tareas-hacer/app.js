require("colors");
const { inquirerMenu, pausa } = require("./helpers/inquirer");

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
