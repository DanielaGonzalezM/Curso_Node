const fs = require("fs");
console.clear();
console.log("============================");
const base = 5;
let salida = "";
const nombreTxt = `tabla-${base}.txt`;
for (let index = 1; index <= 10; index++) {
  salida += `${base} x ${index} = ${base * index} \n`;
}
console.log(salida);
fs.writeFile(nombreTxt, salida, (err) => {
  if (err) throw err;
  console.log(`${nombreTxt} creado`);
});
