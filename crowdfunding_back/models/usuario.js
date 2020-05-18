const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UsuarioSchema = new mongoose.Schema({
    nombres: {type:String, required:true,max:100},
    apellidos: {type:String, required:true,max:100},
    correo: {type:String, required:true,max:100},
    edad: {type:Number, required:true,max:100},
    profesion: {type:String, required:true,max:100},
    ciudad: {type:String, required:true,max:100},
    sitiosWeb: {type:String, required:true,max:300},
    misProyectos: {type: []},
    misDonaciones: {type: []}
})

module.exports = mongoose.model('Usuario', UsuarioSchema);