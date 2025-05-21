'use strict';

const { Sequelize } = require('sequelize');
const process = require('process');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];


let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

const Usuario = require('./Usuario');
const Hotel = require('./hotel');
const Habitacion   = require('./Habitacion');
const Municipio = require('./municipio');
const Departamento = require('./departamentos');

Departamento.hasMany(Municipio, {
  foreignKey: 'departamento_id',
  sourceKey: 'id',
  as: 'municipios'
});

Municipio.belongsTo(Departamento, {
  foreignKey: 'departamento_id',
  sourceKey: 'id',
  as: 'departamento'
});

Hotel.hasMany(Habitacion, {
  foreignKey: 'hotel_id',
  as: 'habitaciones'
});

Habitacion.belongsTo(Hotel, {
  foreignKey: 'hotel_id',
  as: 'hotel'
});


sequelize.sync()
  .then(() => console.log('Modelos sincronizados'))
  .catch(err => console.error('Error al sincronizar modelos', err));

module.exports = { Usuario, Municipio, Departamento, Hotel, Habitacion };



