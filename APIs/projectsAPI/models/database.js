require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DB_URI
});

module.exports = {
  query: async (text, params, callback) => {
    console.log(`Executed the following query: ${text}`);
    return pool.query(text, params, callback);
  }
};
