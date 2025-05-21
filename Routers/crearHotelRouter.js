const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken'); 
const { createHotel, deleteHotel } = require('../controllers/hotelController'); 

// Ruta para crear un hotel, protegida por el middleware de autenticación
router.post('/crearhoteles', authenticateToken, createHotel);

// Ruta para eliminar un hotel
router.delete('/:id', authenticateToken, deleteHotel);

module.exports = router;
