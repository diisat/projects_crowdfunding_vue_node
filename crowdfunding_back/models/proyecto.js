const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProyectoSchema = new mongoose.Schema({
    nombre: {type: String, required:true, max:50},
    descripcion: {type:String, required:true, max:300},
    contribuyentes: {type: []},
    dineroNecesario: {type:Number, required:true},
    dineroActual: {type:Number, required:true},
    vigencia: {type:Number, required:true},
    idCreador: {type:String, required:true},
    cuentaBancaria: {type:String, required:true},
    categoria: {type:String, required:true}

})

module.exports = mongoose.model('Proyecto', ProyectoSchema);