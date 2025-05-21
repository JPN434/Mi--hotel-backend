const Habitacion = require('../models/Habitacion');

// Obtener todas las habitaciones de un hotel específico

exports.getHabitacionesPorHotel = async (req, res) => {
    const { hotelId } = req.params;
    try {
        const habitaciones = await Habitacion.findAll({
            where: { hotel_id: hotelId }
        });

        res.json(habitaciones);
    } catch (error) {
        console.error('Error al obtener habitaciones:', error);
        res.status(500).json({ error: 'Error al obtener habitaciones: ' + error.message });
    }
};



// Obtener el detalle de una habitación específica
exports.getDetalleHabitacion = async (req, res) => {
    const { id } = req.params;

    try {
        const habitacion = await Habitacion.findByPk(id);
        if (!habitacion) {
            return res.status(404).json({ message: 'Habitación no encontrada' });
        }
        res.json(habitacion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los detalles de la habitación' });
    }
};


// Crear una nueva habitación
exports.createHabitacion = async (req, res) => {
    console.log('Body recibido:', req.body); // Para depuración

    const {
        hotel_id,
        numero_habitacion,
        tipo_habitacion,
        capacidad,
        precio,
        disponibilidad,
        descripcion,
        imagen,
        estado
    } = req.body;

    try {
        const nuevaHabitacion = await Habitacion.create({
            hotel_id,
            numero_habitacion,
            tipo_habitacion,
            capacidad,
            precio,
            disponibilidad,
            descripcion,
            imagen,
            estado
        });

        res.status(201).json(nuevaHabitacion);
    } catch (error) {
        console.error('Error al crear la habitación:', error);
        res.status(500).json({ message: 'Error al crear la habitación' });
    }
};


// Editar una habitación
exports.updateHabitacion = async (req, res) => {
    const { id } = req.params;  // El id de la habitación llega como parámetro
    const { numero_habitacion, tipo_habitacion, capacidad, precio, descripcion, imagen, estado } = req.body;

    try {
        const habitacion = await Habitacion.findByPk(id);
        if (!habitacion) {
            return res.status(404).json({ message: 'Habitación no encontrada' });
        }

        // Actualizamos los campos de la habitación
        habitacion.numero_habitacion = numero_habitacion || habitacion.numero_habitacion;
        habitacion.tipo_habitacion = tipo_habitacion || habitacion.tipo_habitacion;
        habitacion.capacidad = capacidad || habitacion.capacidad;
        habitacion.precio = precio || habitacion.precio;
        habitacion.descripcion = descripcion || habitacion.descripcion;
        habitacion.imagen = imagen || habitacion.imagen;
        habitacion.estado = estado || habitacion.estado;

        // Guardamos los cambios
        await habitacion.save();

        res.json(habitacion);  // Retornamos la habitación actualizada
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la habitación' });
    }
};

// Eliminar una habitación
exports.deleteHabitacion = async (req, res) => {
    const { id } = req.params;  // El id de la habitación llega como parámetro

    try {
        const habitacion = await Habitacion.findByPk(id);
        if (!habitacion) {
            return res.status(404).json({ message: 'Habitación no encontrada' });
        }

        // Eliminamos la habitación
        await habitacion.destroy();

        res.json({ message: 'Habitación eliminada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la habitación' });
    }
};







