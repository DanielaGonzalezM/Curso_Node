require("dotenv").config();

const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const Server = require("./models/server");
const server = new Server();
server.listen();
