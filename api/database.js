const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, 
});

pool.connect()
  .then(client => {
    console.log('Successfully connected to the database!');
    client.release();
  })
  .catch(err => console.error('Error connecting to the database:', err.message));

module.exports = pool;