const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
app.pool = pool;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/healthz', (req, res) => {
  res.status(200).send('OK');
});

app.get('/', (req, res) => res.send('API up'));

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

app.post('/api/data', async (req, res) => {
  try {
    const { message } = req.body;
    await pool.query(
      'CREATE TABLE IF NOT EXISTS messages (id SERIAL PRIMARY KEY, text TEXT)'
    );
    const result = await pool.query(
      'INSERT INTO messages (text) VALUES ($1) RETURNING id',
      [message]
    );
    res.json({ id: result.rows[0].id, status: 'success' });
  } catch (error) {
    console.error('Failed to save data:', error);
    res.status(500).json({ status: 'error', message: 'Failed to save data' });
  }
});

function start(port = process.env.PORT || process.env.WEBSITES_PORT || 3000) {
  const HOST = '0.0.0.0';
  const server = app.listen(port, HOST, () => {
    console.log(`API is running on http://${HOST}:${server.address().port}`);
  });
  return server;
}

module.exports = { app, pool, start };

if (require.main === module) {
  start();
}
