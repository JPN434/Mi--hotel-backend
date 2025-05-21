const express = require('express');
const router = express.Router();  
const hotelController = require('../controllers/hotelController');  
const authenticateToken = require('../middleware/authMiddleware');  
const isAdmin = require('../middleware/authAdministardor');
const { createHabitacion, getDetalleHabitacion, getHabitacionesPorHotel } = require('../controllers/habitacionesController');

// Ruta para obtener todos los hoteles
router.get('/', hotelController.getAllHoteles);

// Ruta para crear un nuevo hotel
router.post('/', authenticateToken, hotelController.createHotel);  

router.get('/activos', authenticateToken, hotelController.getHotelesActivos);
// Eliminar hotel
router.delete('/:id', authenticateToken, hotelController.deleteHotel);

router.put('/:id', authenticateToken, hotelController.updateHotel);

router.post('/', isAdmin, createHabitacion);  
router.get('/:id', getDetalleHabitacion);     
router.get('/hotel/:hotelId', getHabitacionesPorHotel);  




module.exports = router;
