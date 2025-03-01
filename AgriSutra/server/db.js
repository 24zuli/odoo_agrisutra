const { Pool } = require("pg");
require("dotenv").config();

console.log("Connecting to database with URL:", process.env.DATABASE_URL);

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ?
        { rejectUnauthorized: false } :
        false,
});

pool
    .connect()
    .then(() => console.log("Connected to PostgreSQL Database"))
    .catch((err) => console.error("Database Connection Error:", err));

module.exports = pool;