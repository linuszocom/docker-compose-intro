const express = require('express');
const apiRoutes = require('./routes');
const pool = require('./database'); // Glöm inte att importera pool

const app = express();
app.use(express.json());

app.use('/api', apiRoutes);

// loggar databasanslutningen direkt vid start
pool.connect()
  .then(client => {
    console.log('Successfully connected to the database!');
    client.release();
  })
  .catch(err => console.error('Error connecting to the database:', err.message));

const port = process.env.PORT || 3000;
const HOST = '0.0.0.0';

if (require.main === module) {
  app.listen(port, HOST, () => {
    // loggar att API:et är igång först när servern har startat
    console.log(`API is running on http://${HOST}:${port}`);
  });
}

module.exports = app;