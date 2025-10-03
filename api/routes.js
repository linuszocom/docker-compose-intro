const express = require('express');
const router = express.Router();
const controllers = require('./controllers');

router.get('/', controllers.getApiStatus);
router.post('/data', controllers.saveApiData);

module.exports = router;