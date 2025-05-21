const express = require('express');
const Router = express.Router();

const {
    getHabitacionesPorHotel,
    getDetalleHabitacion,
    createHabitacion,
    updateHabitacion,
    deleteHabitacion
} = require('../controllers/habitacionesController');

const authenticateToken = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/authAdministardor');

// Rutas públicas
Router.get('/hotel/:hotelId/habitaciones', getHabitacionesPorHotel);
Router.get('/:id', getDetalleHabitacion); // Ver detalle de una habitación

// Rutas protegidas
Router.post('/', authenticateToken, isAdmin, createHabitacion);
Router.put('/:id', authenticateToken, isAdmin, updateHabitacion);
Router.delete('/:id', authenticateToken, isAdmin, deleteHabitacion);

module.exports = Router;




