var express = require('express');
var router = express.Router();
const usuario_controller = require('../controllers/usuario')

router.post('/', usuario_controller.crear)
router.get('/:id',usuario_controller.perfil)
router.put('/:id',usuario_controller.actualizar)
router.delete('/:id',usuario_controller.borrar)

module.exports = router;
