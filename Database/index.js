import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pg;

// Create a connection pool using the database URL from .env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
