const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Puedes personalizar la ubicación

app.put('/api/habitaciones/:id', upload.single('imagen'), async (req, res) => {
    const { id } = req.params;
    const { numero_habitacion, descripcion, estado } = req.body;
    const imagen = req.file ? req.file.path : req.body.imagen; // Si hay un archivo, usar el nuevo, si no, mantener la imagen actual

    try {
        await Habitacion.findByIdAndUpdate(id, {
            numero_habitacion,
            descripcion,
            estado,
            imagen
        });
        res.json({ message: 'Habitación actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la habitación' });
    }
});
