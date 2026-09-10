const express = require("express");
var cors = require("cors");
const {socketController} = require("../sockets/controller");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.server = require("http").createServer(this.app);
    this.io = require("socket.io")(this.server);
    this.paths = {}

    //*Middlewares
    this.middleware();

    //*Rutas de mi aplicación
    this.routes();

    //Sockets
    this.sockets();
  }

  async conectarDB() {
    await dbConnection();
  }

  middleware() {
    //CORS
    this.app.use(cors());

    //Directorio publico
    this.app.use(express.static("public"));

  }

  routes() {
    //this.app.use(this.paths.auth, require("../routes/auth"));
  }

  sockets() {
    this.io.on("connection", socketController);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log("Corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
