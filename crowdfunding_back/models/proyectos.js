const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    name: {type: String, required:true, max:50},
    descripcion: {type:String, required:true, max:300},
    contribuyentes: {type: []},
    dineroNecesario: {type:Number, required:true},
    dineroActual: {type:Number, required:true},
    vigencia: {type:Number, required:true},
    idCreador: {type:String, required:true},
    cuentaBancario: {type:String, required:true}

})