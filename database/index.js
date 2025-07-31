const { Pool } = require("pg");
require("dotenv").config();

/* ***************
 * Connection Pool
 * SSL is required for both development and production environments
 * *************** */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Render's PostgreSQL
  },
});

module.exports = pool;
