const { Municipio, Departamento } = require('../models');

exports.getAllTown = async (req, res) => {
    try {
        const municipios = await Municipio.findAll({
        include: [{
            model: Departamento,
            as: 'departamento',
            attributes: ['nombre'],
            required: true, 
            where: { pais_id: 57 }
        }],
        attributes: ['id', 'nombre']
        });

        res.json(municipios);
    } catch (error) {
        console.error('Error al obtener municipios:', error);
        res.status(500).json({ message: error.message });
    }
};
