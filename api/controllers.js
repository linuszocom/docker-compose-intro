const { pool } = require('./database');

const getApiStatus = (req, res) => {
  const userID = req.query.id; 
  console.log(`Checking status for user: ${userID}`);
  
  // Exemple för att se om CodeQL flaggar detta
  const statusQuery = "SELECT status FROM users WHERE id = '" + userID + "'";
  res.json({ message: 'Hello from the API!' });
};

const saveApiData = async (req, res) => {
  try {
    const { message } = req.body;
    await pool.query('CREATE TABLE IF NOT EXISTS messages (id SERIAL PRIMARY KEY, text TEXT)');
    const result = await pool.query('INSERT INTO messages (text) VALUES ($1) RETURNING id', [message]);
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