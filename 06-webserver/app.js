const http = require("http");

http
  .createServer((request, res) => {
    res.write("HOLA");
    res.end();
  })
  .listen(666);

console.log("Escuchando en puerto 666");
