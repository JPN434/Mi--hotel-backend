require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const usuarioRouters = require('./Routers/usarioRouters');
const cors = require('cors');
const hotelRouters = require('./Routers/hotelRouters');
const municipioRouters = require('./Routers/municipioRoutes');
const habitacionRouters = require('./Routers/habitacionRouters');
const authenticateToken = require('./api/middleware/authenticateToken');

const app = express();

app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        'https://my-hotel-six.vercel.app'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(express.json());

// Base de datos
sequelize.sync();

// Rutas
app.use('/api/usuarios', usuarioRouters);
app.use('/api/hoteles', authenticateToken, hotelRouters);
app.use('/api/municipios', municipioRouters);
app.use('/api/habitaciones', authenticateToken, habitacionRouters);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});





