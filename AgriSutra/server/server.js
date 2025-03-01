const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");

dotenv.config();
console.log(process.env.DB_PASSWORD);

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000" }));

// Use Auth Routes
app.use("/api/auth", authRoutes);

// PostgreSQL Database Connection
const { Pool } = require("pg");
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ?
        { rejectUnauthorized: false } :
        false,
});

// Start the Server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});