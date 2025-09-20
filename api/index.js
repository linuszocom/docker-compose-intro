const express = require('express');
const apiRoutes = require('./routes');

const app = express();
app.use(express.json());

app.use('/api', apiRoutes);

console.log('Application initialized.'); // Lägg till denna logg

module.exports = app;