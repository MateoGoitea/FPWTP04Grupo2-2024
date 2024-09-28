const express = require('express');

const app = express();

//endpoint
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/juego/public/views/index.html");
})

//routing
app.use('/juego', express.static(__dirname+"/juego"));
app.use('/src', express.static(__dirname+"/src"));
app.use('/public', express.static(__dirname+"/public"));
app.use('/resources', express.static(__dirname+"/resources"));
app.use('/views', express.static(__dirname+"/views"));
app.use('/node_modules', express.static(__dirname+"/node_modules"));

//listening
app.listen(5000, ()=>{
    console.log("Servidor corriendo");    
})