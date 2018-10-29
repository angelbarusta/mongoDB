const mongo = require("./connect");
const { DB_NAME } = require("./config")

module.exports = {
    getUsers: function() {
        const db = mongo.instance().db(DB_NAME);//guardamos y creamos la db
        const users = db.collection("users").find({}).toArray();// usuarios que van a devolverse
        return users;//promesa devuelta de api.js
    },
    getUserById: function(id) {
        return users.filter(user=>user._id===id);
    },
    getUserByAgeRange: function(lower = 0, higher = 99) {
        const db = mongo.instance().db(DB_NAME);
        const users = db.collection("users").find({
            age:{
                $gte: Number(lower),//mayor o igual a lower
                $lte: Number(higher)//o menor o igual al valor mas alto
            }
        }).toArray();
        return users;
}}
