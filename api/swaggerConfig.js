const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Winescrape API Dokumentation',
      version: '1.0.0',
      description: 'DevOps demo API för hantering av status och data.',
    },
    servers: [
      {
        url: '/', // Bas-URL för API:et
      },
    ],
  },
  // Ber Swagger VAR dina kommenterade filer ligger:
  apis: ['./routes.js'], // Pekar på din routes-fil
};

const specs = swaggerJsdoc(options);
module.exports = specs;