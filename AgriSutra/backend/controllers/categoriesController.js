const pool = require("../db"); // PostgreSQL connection

// Get all categories
const getCategories = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM categories");
    res.json(result.rows);  // Return the categories as JSON response
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

module.exports = { getCategories };
