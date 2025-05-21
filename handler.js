const app = require('./App'); // Suponiendo que app.js es tu aplicación Express
const serverless = require('serverless-http');

module.exports.handler = serverless(app); // Esta es la función que se invoca en AWS Lambda
