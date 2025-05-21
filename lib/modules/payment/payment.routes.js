const express = require('express');
const router = express.Router();
const controller = require('./payment.controller');
const { verificarToken } = require('../../../middleware/auth');

// CU07 - Registrar pago
router.post('/', controller.registrarPago);

// CU09 - Confirmar pago
router.put('/confirmar/:id_pago', controller.confirmarPago);

// CU08 - Generar QR
router.get('/qr', controller.generarQR);

// registrar pago puede hacerlo el distribuidor
router.post('/', verificarToken(['distribuidor']), controller.registrarPago);

// confirmar solo el admin
router.put('/confirmar/:id_pago', verificarToken(['admin']), controller.confirmarPago);

// QR puede ser visible para ambos
router.get('/qr', verificarToken(['admin', 'distribuidor']), controller.generarQR);

module.exports = router;
