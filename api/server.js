'use strict';

const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, 
});

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
    res.status(500).json({ status: 'error', message: 'Failed to save data' });
  }
});

const port = process.env.PORT || 3000;
const host = '0.0.0.0';
app.listen(port, host, () => {
  console.log(`API is running on http://${host}:${port}`);
});