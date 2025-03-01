const pool = require("../db");

const createUser = async(name, username, email, hashedPassword) => {
    const query =
        "INSERT INTO users (name, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [name, username, email, hashedPassword];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const getUserByEmail = async(email) => {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
    ]);
    return result.rows[0]; // Ensure correct return format
};

const getUserByUsername = async(username) => {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
        username,
    ]);
    return result.rows[0];
};

// New function to fetch user by ID
const getUserById = async(id) => {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
};

module.exports = { createUser, getUserByEmail, getUserByUsername, getUserById }; // Export `getUserById`