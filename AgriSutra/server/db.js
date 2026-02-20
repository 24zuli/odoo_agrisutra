const { Pool } = require("pg");
require("dotenv").config();

console.log("🔌 Connecting to database with URL:");
console.log(process.env.DATABASE_URL);

// Check if you're using Render-hosted PostgreSQL
const isRender = process.env.DATABASE_URL.includes("render.com");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isRender ? { rejectUnauthorized: false } : false,
});

pool
  .connect()
  .then(() => console.log("✅ Connected to PostgreSQL Database"))
  .catch((err) => {
    console.error("❌ Failed to connect to PostgreSQL Database:");
    console.error("Error Code:", err.code || "N/A");
    console.error("Message:", err.message || err);
  });

module.exports = pool;
