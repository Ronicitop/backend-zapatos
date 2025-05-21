const express = require('express');
const router = express.Router();
const controller = require('./pedido.controller');

router.post('/', controller.createPedido);
router.get('/asignados/:id_usuario', controller.getPedidosAsignados);
router.put('/:id/estado', controller.updateEstado);
router.get('/historial/:id_usuario', controller.getHistorialEntregas);


module.exports = router;
