const express = require('express');
const router = express.Router();
const controller = require('./report.controller');
const { verificarToken } = require('../../../middleware/auth');

router.get('/pedidos-por-fecha', controller.pedidosPorFecha);
router.get('/pagos-por-fecha', controller.pagosPorFecha);
router.get('/por-distribuidor', controller.pedidosPorDistribuidor);
router.get('/resumen', controller.resumen);
router.get('/pdf/entregas', controller.exportarPedidosPorFechaPDF);
router.get('/pdf/pagos', controller.exportarPagosPorFechaPDF);
router.get('/pdf/distribuidores', controller.exportarPedidosDistribuidorPDF);
router.get('/pdf/resumen', controller.exportarResumenGeneralPDF);
router.get('/pdf/pagos', verificarToken(['admin']), controller.exportarPagosPorFechaPDF);
module.exports = router;
