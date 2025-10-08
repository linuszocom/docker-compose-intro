const express = require('express');
const router = express.Router();
const controllers = require('./controllers');


/**
 * @swagger
 * /:
 *   get:
 *     summary: Hämtar API:ets status och returnerar ett hälsningsmeddelande.
 *     description: Används för att verifiera att API-tjänsten är igång (health check).
 *     tags:
 *       - Status
 *     responses:
 *       '200':
 *         description: API-tjänsten är online och fungerar.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello from the API!
 */

router.get('/', controllers.getApiStatus);

router.post('/data', controllers.saveApiData);

module.exports = router;