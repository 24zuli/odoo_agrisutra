const pool = require("../db");

async function handelGetSchemes(req, res) {
  try {
    const result = await pool.query("SELECT * FROM schemes ORDER BY id");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function handelGetSchemeById(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM schemes WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Scheme not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function handleSaveScheme(req, res) {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    await pool.query(
      "INSERT INTO saved_schemes (user_id, scheme_id) VALUES ($1, $2)",
      [userId, id]
    );
    res.json({ message: "Scheme saved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  handelGetSchemes,
  handelGetSchemeById,
  handleSaveScheme,
};
