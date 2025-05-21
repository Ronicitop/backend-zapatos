const express = require('express');
const router = express.Router();
const controller = require('./vehicle.controller');

router.get('/', controller.getVehicles);
router.post('/', controller.createVehicle);
router.post('/asignar', controller.assignVehicle);
module.exports = router;
