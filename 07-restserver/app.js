require("dotenv").config()
const express = require("express")
const app = express()

app.get("/", (req,res)=> {
    res.send("Holaa")
})

app.listen(process.env.PORT,()=>{
console.log("Corriendo en puerto", process.env.PORT);
})