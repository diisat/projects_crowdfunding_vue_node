var express = require('express');
var router = express.Router();
const proyecto_controller = require('../controllers/proyecto')

router.get('/', proyecto_controller.index)
router.post('/', proyecto_controller.crear)
router.get('/:id', proyecto_controller.detalles)
router.put('/:id', proyecto_controller.actualizar)
router.delete('/:id', proyecto_controller.borrar)


module.exports = router;