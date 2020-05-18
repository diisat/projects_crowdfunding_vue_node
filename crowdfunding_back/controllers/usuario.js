const Usuario = require('../models/usuario')

exports.crear = function(req,res,next){
    let usuario= new Usuario({
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        correo: req.body.correo,
        contrasena: req.body.contrasena,
        edad: req.body.edad,
        profesion: req.body.profesion,
        ciudad: req.body.ciudad,
        sitiosWeb: req.body.sitiosWeb,
        misProyectos: req.body.misProyectos,
        misDonaciones: req.body.misDonaciones
    })

    usuario.save(err => {
        if(err){
            return next(err)
        }else{
            res.send('Usuario creado satisfactoriamente')
        }
    })
}

exports.perfil = function (req,res,next){
    Usuario.findById(req.params.id, function(err, usuario){
        if(err){
            return next(err);
        }else{
            res.send(usuario)
        }
    })
}

exports.actualizar = function (req,res,next){
    Usuario.findByIdAndUpdate(req.params.id, { $set: req.body} , function(err, usuario){
        if(err){
            return next(err);
        }else{
            res.send('Usuario actualizado satisfactoriamente')
        }
    })
}
exports.borrar = function (req,res,next){
    Usuario.findByIdAndDelete(req.params.id, function(err, usuario){
        if(err){
            return next(err);
        }else{
            res.send('Usuario eliminado satisfactoriamente')
        }
    })
}

exports.index = function (req,res,next){
    let usuarios =Usuario.find({}, function(err, usuarios){
        if(err){
            return next(err);
        }else{
            res.send(usuarios)
        }
    })
}
