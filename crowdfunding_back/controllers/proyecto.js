const Proyecto = require('../models/proyecto')


exports.crear = function (req, res, next) {
    let proyecto = new Proyecto({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        contribuyentes: req.body.contribuyentes,
        dineroNecesario: req.body.dineroNecesario,
        dineroActual: req.body.dineroActual,
        vigencia: req.body.vigencia,
        idCreador: req.body.idCreador,
        cuentaBancaria: req.body.cuentaBancaria,
        categoria: req.body.categoria
    })

    proyecto.save(err => {
        if(err){
            return next(err)
        }else{
            res.send('Proyecto creado satisfactoriamente')
        }
    })

}

exports.detalles = function (req,res,next){
    Proyecto.findById(req.params.id, function(err, proyecto){
        if(err){
            return next(err);
        }else{
            res.send(proyecto)
        }
    })
}

exports.actualizar = function (req,res,next){
    Proyecto.findByIdAndUpdate(req.params.id, { $set: req.body} , function(err, proyecto){
        if(err){
            return next(err);
        }else{
            res.send('Proyecto actualizado satisfactoriamente')
        }
    })
}
exports.borrar = function (req,res,next){
    Proyecto.findByIdAndDelete(req.params.id, function(err, proyecto){
        if(err){
            return next(err);
        }else{
            res.send('Proyecto eliminado satisfactoriamente')
        }
    })
}

exports.index = function (req,res,next){
    let proyectos =Proyecto.find({}, function(err, proyectos){
        if(err){
            return next(err);
        }else{
            res.send(proyectos)
        }
    })
}
