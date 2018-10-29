//--extraemos un cliente mongo
const MongoClient = require('mongodb').MongoClient;//inclusion de nuestro modulo mongodb, de el extraemos un mongoClient
//--extraer valores de configuracion en un json--
const { DB_HOST, DB_PORT, DB_NAME } = require("./config");
//------------------------------------------------------

//--Se elabora la conexion-----------
const connectionUrl = `mongodb://${DB_HOST}:${DB_PORT}`; 
//------------------------------------------------------

//--exportamos una inclucion envolviendola dentro de una funcion----
module.exports = (()=>{// ()
    let instance = null, //instancia de mongo
        isDisconnecting = false;

    function connect() {
        return new Promise((resolve, reject)=>{
            MongoClient.connect(connectionUrl, { useNewUrlParser: true }, function(err, client) {
                //---En dado caso de error
                if (err) { reject(err); }
                console.log("Conectado satisfactoriamente al servidor de Mongo!");
                instance = client;// La instancia se guarda una vez conectado mongo hasta el final de la aplicacion
                //--Para mantener la instancia de nuestro cliente--
                resolve(client.db(DB_NAME));
            });
        });
    }

    function disconnect(){
        if (instance && !isDisconnecting){//-- Solicita que exista una instancia antes y que no este en proceso de desconexion
            isDisconnecting = true;
            console.log("Desconectando instancia de Mongo");
            return new Promise((resolve, reject)=>{
                instance.close((err, result)=>{
                    if (err) { reject(err); isDisconnecting=false; return; }
                    console.log("Instancia de Mongo desconectada!");
                    resolve();
                });
            })
        }
    }

    return {//al final de la inclucion se retorna aquello que se decea vicible
        connect,
        disconnect,
        instance 
    }
})();