const { Sequelize } = require('sequelize');

// Leer desde variables de entorno (útil para Vercel)
const DB_NAME = process.env.DB_NAME || 'hoteles';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '123456';
const DB_HOST = process.env.DB_HOST || '127.0.0.1';
const DB_PORT = process.env.DB_PORT || 3306; // Puerto de MySQL es 3306 por defecto

// Crear instancia de Sequelize para MySQL
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql', // Aquí especificamos MySQL
    logging: false,    // Puedes cambiar a false si no quieres logs
});

module.exports = sequelize;

