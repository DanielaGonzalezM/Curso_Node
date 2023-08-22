const express = require("express")
const app = express()
const port = 666

// Servir contenido estático

app.use(express.static("public"))

 app.get("/hola-mundo", (req,res) =>{
    res.send("Hello World - 2")
});

app.get("*", (req,res) =>{
    res.sendFile(__dirname + "/public/404.html")
});

app.listen(port,()=>{
    console.log(`Corriendo en puerto:${port}`);
})