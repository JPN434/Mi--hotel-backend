const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/UsuarioControllers');
const authMiddleware = require('../middleware/authMiddleware');          
// Definir las rutas y sus controladores
router.post('/register', usuarioController.register);
router.post('/login', usuarioController.login);
router.get('/infoUsuario', authMiddleware, usuarioController.getUsuario);

// Exportar el router
module.exports = router;
