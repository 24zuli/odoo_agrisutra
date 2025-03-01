const { Pool } = require("pg");

// Database connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

// ✅ Fetch equipment by category
const getEquipmentByCategory = async (req, res) => {
  const { category } = req.params;
  console.log("🔍 Received category:", category);

  try {
    const query = `
      SELECT 
        e.equipment_id, e.name, e.description, e.price, e.location, e.availability, e.phone_number,
        u.name AS owner_name,
        c.name AS category_name
      FROM equipment e
      JOIN categories c ON e.category_id = c.category_id
      JOIN users u ON e.owner_id = u.id
      WHERE LOWER(c.name) = LOWER($1);
    `;

    const values = [category];
    console.log("🟢 Running SQL Query:", query, values);

    const result = await pool.query(query, values);
    console.log("✅ Query Result:", result.rows);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: `No equipment found for category: ${category}` });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("🔥 Error fetching equipment by category:", error);
    res.status(500).json({ error: "Failed to fetch equipment" });
  }
};

// ✅ Add new equipment (Authenticated Route)
const addEquipment = async (req, res) => {
  try {
    console.log("✅ Received Request Body:", req.body);

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body is empty. Please send valid data." });
    }

    const { category, name, description, price, location, availability, phone_number } = req.body;

    if (!category || !name || !price || !location) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // ✅ Get owner ID from the authentication token
    const owner_id = req.user?.id; // Middleware should set req.user

    if (!owner_id) {
      return res.status(401).json({ error: "Owner ID is missing. User not authenticated." });
    }

    // ✅ Fetch category_id from categories table
    const categoryResult = await pool.query("SELECT category_id FROM categories WHERE LOWER(name) = LOWER($1)", [category]);
    if (categoryResult.rows.length === 0) return res.status(400).json({ error: "Invalid category name." });

    const category_id = categoryResult.rows[0].category_id;

    // ✅ Insert Equipment (Now includes owner_id)
    const insertQuery = `
        INSERT INTO equipment (category_id, owner_id, name, description, price, location, availability, phone_number, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW()) RETURNING *;
    `;
    const values = [category_id, owner_id, name, description, price, location, availability, phone_number];

    const newEquipment = await pool.query(insertQuery, values);
    console.log("✅ Equipment Added:", newEquipment.rows[0]);

    res.status(201).json({ message: "Equipment listed successfully", equipment: newEquipment.rows[0] });

  } catch (error) {
    console.error("🔥 Error adding equipment:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

// ✅ Fetch available equipment (with filters for category & availability)
const getAvailableEquipment = async (req, res) => {
  try {
    const { category, availability } = req.query;
    console.log("🔍 Received category:", category, "Availability:", availability);

    let query = `
        SELECT e.*, u.name AS owner_name, c.name AS category
        FROM equipment e
        JOIN users u ON e.owner_id = u.id
        JOIN categories c ON e.category_id = c.category_id
    `;

    let params = [];
    let conditions = [];

    if (category) {
      conditions.push(`LOWER(c.name) = LOWER($1)`);
      params.push(category);
    }

    if (availability) {
      conditions.push(`LOWER(e.availability) = LOWER($${params.length + 1})`);
      params.push(availability);
    }

    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(" AND ");
    }

    console.log("🟢 Running SQL Query:", query, params);
    const result = await pool.query(query, params);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: `No equipment found` });
    }

    console.log("✅ Equipment Found:", result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error("🔥 Error fetching equipment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const getEquipmentDetails = async (req, res) => {
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
  };
  
  // ✅ Book Equipment
  const bookEquipment = async (req, res) => {
    const { equipment_id } = req.params;
    const { user_id, start_date, end_date } = req.body;
  
    try {
      // Fetch owner_id and price from equipment table
      const equipmentQuery = `SELECT owner_id, price, availability FROM equipment WHERE equipment_id = $1;`;
      const equipmentResult = await pool.query(equipmentQuery, [equipment_id]);
  
      if (equipmentResult.rows.length === 0) {
        return res.status(404).json({ error: "Equipment not found" });
      }
  
      const { owner_id, price, availability } = equipmentResult.rows[0];
  
      // Check if equipment is available
      if (availability !== "Available Now") {
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
  };

module.exports = {
  getEquipmentByCategory,
  addEquipment,
  getAvailableEquipment,
  getEquipmentDetails, 
  bookEquipment 
};
