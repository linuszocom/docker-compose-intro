const express = require('express');
const router = express.Router();
const controllers = require('./controllers');


/**
 * @swagger
 * /:
 * get:
 * summary: Hämtar API:ets status och returnerar ett hälsningsmeddelande.
 * description: Används för att verifiera att API-tjänsten är igång (Health Check).
 * tags:
 * - Status
 * responses:
 * 200:
 * description: API-tjänsten är online och fungerar.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * example: Hello from the API!
 */

router.get('/', controllers.getApiStatus);

/**
 * @swagger
 * /data:
 * post:
 * summary: Sparar ett meddelande i databasen.
 * description: Skapar en ny rad i tabellen 'messages' med textinnehållet.
 * tags:
 * - Data
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * description: Textmeddelandet som ska sparas.
 * responses:
 * 200:
 * description: Meddelandet sparades framgångsrikt och returnerar ID.
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * id:
 * type: integer
 * status:
 * type: string
 * example: success
 * 500:
 * description: Serverfel vid försök att spara data.
 */

router.post('/data', controllers.saveApiData);

module.exports = router;