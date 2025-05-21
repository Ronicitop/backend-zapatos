const express = require('express');
const router = express.Router();
const controller = require('./pedido.controller');
const { verificarToken } = require('../../../middleware/auth');

router.post('/', controller.createPedido);
router.get('/asignados/:id_usuario', controller.getPedidosAsignados);
router.put('/:id/estado', controller.updateEstado);
router.get('/historial/:id_usuario', controller.getHistorialEntregas);
router.put('/:id/entrega', controller.registrarUbicacionEntrega);
// ejemplo: permitir a distribuidores ver sus pedidos
router.get('/asignados/:id_usuario', verificarToken(['distribuidor', 'admin']), controller.getPedidosAsignados);
// solo admin puede actualizar estado de pedidos
router.put('/:id/estado', verificarToken(['admin']), controller.updateEstado);
// entrega real puede ser solo por distribuidor
router.put('/:id/entrega', verificarToken(['distribuidor']), controller.registrarUbicacionEntrega);
// historial propio
router.get('/historial/:id_usuario', verificarToken(['distribuidor', 'admin']), controller.getHistorialEntregas);
module.exports = router;
