const { Pool } = require("pg");

// Database connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

// Fetch equipment by category
const getEquipmentByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const query = `
      SELECT 
        e.equipment_id, e.name, e.description, e.price, e.no_of_units,
        e.available_from, e.available_to, e.location_lat, e.location_lng,
        e.phone_number, e.availability,
        u.name AS owner_name,
        c.name AS category_name
      FROM equipment e
      JOIN categories c ON e.category_id = c.category_id
      JOIN users u ON e.owner_id = u.id
      WHERE LOWER(c.name) = LOWER($1);
    `;

    const values = [category];
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No equipment found for this category" });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching equipment by category:", error);
    res.status(500).json({ error: "Failed to fetch equipment" });
  }
};

module.exports = { getEquipmentByCategory };
