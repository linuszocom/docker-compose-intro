const { pool } = require('./database');

const getApiStatus = (req, res) => {
  console.log('GET /api endpoint was called.'); 
  res.json({ message: 'Hello from the API!' });
};

// const saveApiData = async (req, res) => {
//   try {
//     const { message } = req.body;
//     await pool.query('CREATE TABLE IF NOT EXISTS messages (id SERIAL PRIMARY KEY, text TEXT)');
//     const result = await pool.query('INSERT INTO messages (text) VALUES ($1) RETURNING id', [message]);
//     res.json({ id: result.rows[0].id, status: 'success' });
//   } catch (error) {
//     console.error('Failed to save data:', error);
//     res.status(500).json({ status: 'error', message: 'Failed to save data' });
//   }
// };

const saveApiData = async (req, res) => {
  try {
    // logg att endpointen har anropats
    console.log('POST /api/data endpoint was called.');
    const { message } = req.body;

    // logg när vi ansluter till databasen
    console.log('Attempting to create "messages" table if it does not exist...');
    await pool.query('CREATE TABLE IF NOT EXISTS messages (id SERIAL PRIMARY KEY, text TEXT)');
    console.log('"messages" table is ready.');

    // logg när vi försöker spara data
    console.log(`Attempting to save data: "${message}"`);
    const result = await pool.query('INSERT INTO messages (text) VALUES ($1) RETURNING id', [message]);
    console.log('Data saved successfully.');

    // logg när vi skickar ett lyckat svar
    console.log('Sending successful response.');
    res.json({ id: result.rows[0].id, status: 'success' });

  } catch (error) {
    // logg körs om något går fel i try-blocket
    console.error('Failed to save data:', error);
    res.status(500).json({ status: 'error', message: 'Failed to save data' });
  }
};

module.exports = {
  getApiStatus,
  saveApiData,
};