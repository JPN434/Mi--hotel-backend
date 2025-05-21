require('dotenv').config();
const express = require('express');
const serverless = require('serverless-http'); // ✅ necesario para Vercel
const sequelize = require('./config/database');
const usuarioRouters = require('./Routers/usarioRouters');
const cors = require('cors');
const hotelRouters = require('./Routers/hotelRouters');
const municipioRouters = require('./Routers/municipioRoutes');
const habitacionRouters = require('./Routers/habitacionRouters');
const authenticateToken = require('./middleware/authenticateToken');

const app = express();

// Middleware CORS
app.use(
    cors({
        origin: [
            'http://localhost:3000',
            'http://localhost:3001',
            'https://my-hotel-six.vercel.app'
        ],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    })
);

app.use(express.json());

// Sincronizar base de datos
sequelize.sync();

// Rutas
app.use('/api/usuarios', usuarioRouters);
app.use('/api/hoteles', authenticateToken, hotelRouters);
app.use('/api/municipios', municipioRouters);
app.use('/api/habitaciones', authenticateToken, habitacionRouters);



module.exports = app;
module.exports.handler = serverless(app);


