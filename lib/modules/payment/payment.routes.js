const express = require('express');
const router = express.Router();
const controller = require('./payment.controller');

// CU07 - Registrar pago
router.post('/', controller.registrarPago);

// CU09 - Confirmar pago
router.put('/confirmar/:id_pago', controller.confirmarPago);

router.get('/qr', controller.generarQR);

module.exports = router;
