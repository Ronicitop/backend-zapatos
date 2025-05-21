const express = require('express');
const router = express.Router();
const controller = require('./assignment.controller');

// Ruta para asignar un pedido a un distribuidor y vehículo
router.post('/asignar', controller.assignPedido);

module.exports = router; // 👈 ¡IMPORTANTE!
