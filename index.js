const express = require("express");
const app = express();
const { PORT } = require("./config");
const mongo = require("./db/connect");

require("./routes/api")(app);
require("./routes/views")(app);
//-------conexion con la instancia de mongo--punto de entrada de la app
async function initDB(){
    //--se usa un await para esperar la conexion
    const db = await mongo.connect();
    //--si devuelve una instancia real de mongo
    if (db) { initExpress(); }//entonces inicializamos expres
}
//-----------------------------

function initExpress(){
    console.log("Iniciando instancia de Express...");
    app.listen(PORT, ()=>{
        console.log("El servidor Express esta activo.");
    });
    //--agregamos 2 controladores que avicen cuando cierra node
    process.on("SIGINT", closeApp);
    process.on("SIGTERM", closeApp);
    //------------------------------------
}

function closeApp(){//--funcion que cierra la app--
    mongo.disconnect()//primero desconectando mongo, "el nodo"
        .then(()=>process.exit(0));//procesando la salida exitoza del proceso con un cero
}
//--Punto de entrada de la app--- 
initDB();
//-------------------------