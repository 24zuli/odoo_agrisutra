const pool = require("../db");

async function getUserProfile(req, res) {
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({ error: "Missing userId" });
    }

    const result = await pool.query(
      `SELECT id, name, username, email, gender, date_of_birth, state, district, phone_number, profile_completed, created_at, updated_at
       FROM users WHERE id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateUserProfile(req, res) {
  try {
    const {
      id,
      name,
      username,
      email,
      gender,
      date_of_birth,
      state,
      district,
      phone_number,
      profile_completed,
    } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Missing user id" });
    }

    const result = await pool.query(
      `UPDATE users 
       SET name = $2,
           username = $3,
           email = $4,
           gender = $5,
           date_of_birth = $6,
           state = $7,
           district = $8,
           phone_number = $9,
           profile_completed = $10,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $1
       RETURNING id, name, username, email, gender, date_of_birth, state, district, phone_number, profile_completed, created_at, updated_at`,
      [
        id,
        name,
        username,
        email,
        gender,
        date_of_birth,
        state,
        district,
        phone_number,
        profile_completed,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found or update failed" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getUserProfile,
  updateUserProfile,
};
