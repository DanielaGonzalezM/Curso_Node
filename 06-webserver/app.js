const http = require("http");

http
  .createServer((request, res) => {
    // res.writeHead(200,{'Conten-Type': 'application/json'});
    // const persona = {
    //     id:1,
    //     nombre: 'Daniela'
    // }
    // res.write(JSON.stringify(persona));

    res.setHeader("Content-Disposition", "Attachment; filename=cursolista.csv");
    res.writeHead(200, { "Conten-Type": "application/csv" });
    res.write("id, nombre \n");
    res.write("1, Fernando \n");
    res.write("2, Daniela \n");
    res.write("3, Maria \n");
    res.write("4, Bryam \n");
    res.end();
  })
  .listen(666);

console.log("Escuchando en puerto 666");
