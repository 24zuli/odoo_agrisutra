const pool = require("../db");

// GET all schemes
async function handelGetSchemes(req, res) {
    try {
        const result = await pool.query("SELECT * FROM schemes ORDER BY id");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// GET a specific scheme by id
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

// POST save scheme (protected route)
async function handleSaveScheme(req, res) {
    const { id } = req.params;
    const userId = req.user.id; // Set by authentication middleware
    try {
        // Example: Insert into a "saved_schemes" table (create this table as needed)
        await pool.query(
            "INSERT INTO saved_schemes (user_id, scheme_id) VALUES ($1, $2)", [userId, id]
        );
        res.json({ message: "Scheme saved successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// GET trending schemes
// async function handleGetTrendingSchemes(req, res) {
//   try {
//     const result = await pool.query(
//       "SELECT * FROM schemes WHERE trending = true ORDER BY id"
//     );
//     res.json(result.rows);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// GET all schemes (Explore More)
async function handleGetAllSchemes(req, res) {
    try {
        const result = await pool.query("SELECT * FROM schemes ORDER BY id");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function handleGetTrendingSchemes(req, res) {
    try {
        const result = await pool.query(
            "SELECT * FROM schemes WHERE date BETWEEN $1 AND $2 ORDER BY id", ["2023-01-01", "2025-12-31"]
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    handelGetSchemes,
    handelGetSchemeById,
    handleSaveScheme,
    handleGetTrendingSchemes,
    handleGetAllSchemes,

};