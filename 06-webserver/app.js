const express = require("express")
const app = express()
const port = 666

app.get("/", (req,res) => {
    res.send("Hello World")
});

app.get("/hola-mundo", (req,res) =>{
    res.send("Hello World - 2")
});

app.get("*", (req,res) =>{
    res.send("404 | Not found")
});

app.listen(port,()=>{
    console.log(`Corriendo en puerto:${port}`);
})