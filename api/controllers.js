const { pool } = require('./database');

const getApiStatus = (req, res) => {
  console.log('GET /api endpoint was called.'); 
  res.json({ message: 'Hello from the API!' });
};

const saveApiData = async (req, res) => {
  try {
    const { message } = req.body;
    await pool.query('CREATE TABLE IF NOT EXISTS messages (id SERIAL PRIMARY KEY, text TEXT)');
    const result = await pool.query('INSERT INTO messages (text) VALUES ($1) RETURNING id', [message]);
    throw new Error('This is a test error!');
    res.json({ id: result.rows[0].id, status: 'success' });
  } catch (error) {
    console.error('Failed to save data:', error);
    res.status(500).json({ status: 'error', message: 'Failed to save data' });
  }
};

module.exports = {
  getApiStatus,
  saveApiData,
};