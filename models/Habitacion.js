// src/models/Habitacion.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Habitacion = sequelize.define('Habitacion', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    hotel_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'hoteles', key: 'id' }
    },
    numero_habitacion: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    tipo_habitacion: {
        type: DataTypes.ENUM('sencilla', 'doble'),
        allowNull: false
    },
    capacidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    disponibilidad: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    descripcion: {
        type: DataTypes.TEXT
    },
    imagen: {
        type: DataTypes.STRING(200)
    },
    estado: {
        type: DataTypes.STRING
    }
    }, {
    tableName: 'habitaciones',
    timestamps: false
});

module.exports = Habitacion;
