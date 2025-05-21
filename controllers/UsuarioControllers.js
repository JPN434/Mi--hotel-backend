const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario'); // Asegúrate de que el modelo esté bien importado

// Función para registrar un nuevo usuario
exports.register = async (req, res) => {
    const { nombre, correo, clave, telefono, direccion, tipo } = req.body;

    try {
        // Verificar si el correo ya está registrado
        const usuarioExistente = await Usuario.findOne({ where: { correo } });
        if (usuarioExistente) {
            return res.status(400).json({ error: 'El correo ya está registrado' });
        }

        // Encriptar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(clave, 10);

        // Crear el nuevo usuario en la base de datos
        const nuevoUsuario = await Usuario.create({
            nombre,
            correo,
            clave: hashedPassword,
            telefono,
            direccion,
            tipo
        });

        // Generar el token con la información del nuevo usuario
        const token = jwt.sign(
            { id: nuevoUsuario.id, tipo: nuevoUsuario.tipo },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Extraer los datos que se devolverán al frontend (sin la contraseña)
        const { id, nombre: nombreUsuario, correo: correoUsuario, telefono: telefonoUsuario, direccion: direccionUsuario, tipo: tipoUsuario } = nuevoUsuario;

        // Responder con el token y los datos del usuario
        res.status(201).json({
            message: 'Registro exitoso',
            token,
            tipo: tipoUsuario,
            usuario: { id, nombre: nombreUsuario, correo: correoUsuario, telefono: telefonoUsuario, direccion: direccionUsuario, tipo: tipoUsuario }
        });

    } catch (error) {
        console.error(error);  // Mostrar el error en consola
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
};

// Función para iniciar sesión (ya la tenías)
// Función para iniciar sesión
exports.login = async (req, res) => {
    const { correo, clave } = req.body; // correo del body

    try {
        // Buscar el usuario en la base de datos por correo
        const usuario = await Usuario.findOne({ where: { correo } });

        // Si el usuario no existe o las contraseñas no coinciden
        if (!usuario || !(await bcrypt.compare(clave, usuario.clave))) {
            return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
        }

        // Generar el token con la información del usuario
        const token = jwt.sign(
            { id: usuario.id, tipo: usuario.tipo },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Extraer los datos que se devolverán al frontend (renombrando correo para evitar conflictos)
        const { id, nombre, correo: correoUsuario, telefono, direccion, tipo } = usuario;

        // Responder con el token y los datos del usuario
        res.json({
            message: 'Login exitoso',
            token,
            tipo,
            usuario: { id, nombre, correo: correoUsuario, telefono, direccion, tipo }
        });

    } catch (error) {
        console.error(error); // Mostrar el error en consola
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};


// Función para obtener los datos del usuario logueado
exports.getUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.userId, {
            attributes: { exclude: ['clave'] }  // Excluir contraseña
        });

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la información del usuario' });
    }
};






