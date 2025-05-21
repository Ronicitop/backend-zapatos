const express = require('express');
const router = express.Router();
const controller = require('./maps.controller');


router.get('/ruta', controller.obtenerRuta);
router.get('/ruta-falsa/:id_pedido', controller.obtenerRutaPorPedido);
router.get('/ruta-real/:id_pedido', controller.obtenerRutaRealPorPedido);

module.exports = router;
