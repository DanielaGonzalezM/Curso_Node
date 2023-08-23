const express = require("express");
const app = express();
const port = 666;

//TODO: require("hb")
app.set("view engine", "hbs");
// Servir contenido estático

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home")
  });

app.get("/generic", (req, res) => {
  res.sendFile(__dirname + "/public/generic.html");
});

app.get("/element", (req, res) => {
  res.sendFile(__dirname + "/public/element.html");
});

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/404.html");
});

app.listen(port, () => {
  console.log(`Corriendo en puerto:${port}`);
});
