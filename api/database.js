const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, 
});

module.exports = {
  pool,
  async testConnection() {
    try {
      const client = await pool.connect();
      console.log('Successfully connected to the database!');
      client.release();
      return true;
    } catch (err) {
      console.error('Error connecting to the database:', err.message);
      return false;
    }
  }
};