const express = require("express");
const pool = require("../db");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");

// ✅ Fetch Equipment Details
router.get("/:equipment_id", async (req, res) => {
  const { equipment_id } = req.params;

  try {
    const query = `
      SELECT e.*, u.name AS owner_name, u.phone_number
      FROM equipment e
      JOIN users u ON e.owner_id = u.id
      WHERE e.equipment_id = $1;
    `;
    const result = await pool.query(query, [equipment_id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Equipment not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("🔥 Error fetching equipment details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/:equipment_id/book", authenticateToken, async (req, res) => {
    const { equipment_id } = req.params;
    const { user_id, start_date, end_date } = req.body;

    try {
        // Fetch owner_id and price from equipment table
        const equipmentQuery = `SELECT owner_id, price FROM equipment WHERE equipment_id = $1;`;
        const equipmentResult = await pool.query(equipmentQuery, [equipment_id]);

        if (equipmentResult.rows.length === 0) {
            return res.status(404).json({ error: "Equipment not found" });
        }

        const { owner_id, price } = equipmentResult.rows[0];

        // Check if equipment is available
        const availabilityQuery = `SELECT availability FROM equipment WHERE equipment_id = $1;`;
        const availabilityResult = await pool.query(availabilityQuery, [equipment_id]);

        if (availabilityResult.rows[0].availability !== "Available Now") {
            return res.status(400).json({ error: "Equipment is already booked" });
        }

        // Insert booking record with owner_id and price
        const bookingQuery = `
            INSERT INTO bookings (user_id, owner_id, equipment_id, booking_status, cost, start_date, end_date, created_at)
            VALUES ($1, $2, $3, 'Booked', $4, $5, $6, NOW())
            RETURNING *;
        `;
        const bookingResult = await pool.query(bookingQuery, [user_id, owner_id, equipment_id, price, start_date, end_date]);

        // ✅ Update equipment status to "Not Available"
        const updateEquipmentQuery = `
            UPDATE equipment SET availability = 'Not Available' WHERE equipment_id = $1;
        `;
        await pool.query(updateEquipmentQuery, [equipment_id]);

        res.status(201).json({ success: true, message: "Booking confirmed", booking: bookingResult.rows[0] });
    } catch (error) {
        console.error("🔥 Error booking equipment:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = router;
