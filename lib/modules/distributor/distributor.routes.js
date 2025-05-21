const express = require('express');
const router = express.Router();
const controller = require('./distributor.controller');

// Ruta de prueba
router.get('/ping', (req, res) => {
  res.send('RUTA /api/distribuidores/ping OK');
});

// Rutas principales
router.get('/', controller.getDistributors);
router.post('/', controller.createDistributor);

module.exports = router;
