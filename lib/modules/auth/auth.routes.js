const express = require('express');
const router = express.Router();
const controller = require('./auth.controller');
const { verificarToken } = require('../../../middleware/auth');


router.post('/login', controller.login);
router.post('/register', controller.registrar);
router.put('/reset-password', controller.actualizarPassword);
router.get('/perfil', verificarToken(), controller.perfil);

module.exports = router;
