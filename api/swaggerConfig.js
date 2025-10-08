const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Dokumentation',
      version: '1.0.0',
      description: 'DevOps demo API för hantering av status och data.',
    },
    servers: [
      { url: '/api' }, // relativ bas funkar både lokalt och i prod bakom samma host
      { url: 'http://localhost:3000/api' }, // lokal 
      { url: 'https://demo-app-2-fwdphvd3cpcxafcw.swedencentral-01.azurewebsites.net/api' }, // stage dev
    ],
  },
  // Ber Swagger VAR dina kommenterade filer ligger:
  apis: [path.resolve(__dirname, 'routes.js')], // Pekar på din routes-fil
};

const specs = swaggerJsdoc(options);
module.exports = specs;