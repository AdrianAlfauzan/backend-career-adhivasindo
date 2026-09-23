const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.on("connect", () => console.log("Connected to PostgreSQL"));
pool.on("error", (err) => console.error("PostgreSQL error:", err.message));

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
