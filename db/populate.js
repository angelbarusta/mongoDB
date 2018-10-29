//--Este archivo es para facilitar el proceso de poblar y limpiar la base de datos.

const mongo = require("./connect");// viene directa de la instancia de coneccion
const argv = require('yargs').argv; // yargs se hace para pasar argumentos a nuestro modulo de node
const usersData = require("../resources/users");

//--Argumento para poblar la db--base a colecciones "users"
//--Usando los datos de users.json
if (argv.fill) {
    mongo.connect()
        .then(db=>{
            db.collection("users").insertMany(usersData, (err, result)=>{
                if (err) throw err;
                console.log("Los datos han sido insertados satisfactoriamente!");
                mongo.disconnect();
            });
        })
    return;
}
//--Argumento para limpiar la db--base a colecciones "users"
//--Usando los datos de users.json
if (argv.clear) {
    mongo.connect()
        .then(db=>{
            db.collection("users").drop((err, result)=>{
                if (err) throw err;
                console.log("La colección se ha descartado satisfactoriamente!");
                mongo.disconnect();
            });
        })
    return;
}