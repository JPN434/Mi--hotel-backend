const Hotel = require('../models/hotel');
const Usuario = require('../models/Usuario');

exports.createHotel = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.userId, { attributes: { exclude: ['clave'] } });
        if (usuario.tipo !== 'administrador') {
            return res.status(401).json({ error: 'Solo administradores pueden crear hoteles' });
        }

        const { municipio_id, nombre, direccion, clasificacion, descripcion, imagen } = req.body;

        // Validar que los campos requeridos no estén vacíos
        if (!municipio_id || !nombre || !direccion || !clasificacion || !descripcion) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        const hotel = await Hotel.create({
            municipio_id,
            nombre,
            direccion,
            clasificacion,
            descripcion,
            imagen,
            estado: "A"
        });

        // Devolver el hotel creado en la respuesta
        res.status(201).json({ message: 'Hotel creado exitosamente', hotel });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el hotel: ' + error.message });
    }
};


exports.getHotelesActivos = async (req, res) => {
    try {
        // Buscar hoteles cuyo estado sea 'A' (activo)
        const hoteles = await Hotel.findAll({ where: { estado: 'A' } });
        res.json(hoteles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener hoteles activos' });
    }
};


exports.getAllHoteles = async (req, res) => {
    try {
        const hoteles = await Hotel.findAll();
        res.json(hoteles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los hoteles' });
    }
};

exports.deleteHotel = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.userId);
        if (!usuario || usuario.tipo !== 'administrador') {
            return res.status(403).json({ error: 'No autorizado para eliminar hoteles' });
        }

        const hotel = await Hotel.findByPk(req.params.id);
        if (!hotel) {
            return res.status(404).json({ error: 'Hotel no encontrado' });
        }

        // Opción 1: Eliminar físicamente
        await hotel.destroy();

        // Opción 2: Marcar como inactivo
        hotel.estado = 'I';
        await hotel.save();

        res.json({ message: 'Hotel marcado como inactivo' });
        
        // Si quieres eliminar físicamente en lugar de marcar como inactivo, descomenta la línea de destroy y comenta la de save.
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el hotel: ' + error.message });
    }
};

exports.updateHotel = async (req, res) => {
    const { id } = req.params;  // Obtener el ID del hotel desde la URL
    const { municipio_id, nombre, direccion, clasificacion, descripcion, imagen, estado } = req.body;

    try {
        const hotel = await Hotel.findByPk(id);  // Buscar el hotel por ID
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel no encontrado' });
        }

        // Actualizar los campos del hotel
        hotel.municipio_id = municipio_id || hotel.municipio_id;
        hotel.nombre = nombre || hotel.nombre;
        hotel.direccion = direccion || hotel.direccion;
        hotel.clasificacion = clasificacion || hotel.clasificacion;
        hotel.descripcion = descripcion || hotel.descripcion;
        hotel.imagen = imagen || hotel.imagen;
        hotel.estado = estado || hotel.estado;

        await hotel.save();  // Guardar los cambios en la base de datos

        res.json(hotel);  // Retornar el hotel actualizado
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el hotel' });
    }
};
