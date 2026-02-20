const pool = require("../db");
const jwt = require("jsonwebtoken");

// ✅ Middleware to Verify JWT Token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    console.log("Received Token:", token); // Log token for debugging

    if (!token) {
        console.error("No token provided");
        return res.status(401).json({ message: "Unauthorized: No token" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error("❌ Invalid token:", err);
            return res.status(403).json({ message: "Unauthorized: Invalid token" });
        }

        req.userId = decoded.id; // Attach user ID to request
        console.log("✅ Token Verified, User ID:", req.userId);
        next();
    });
};

// ✅ Controller Function to Update User Location
const updateUserLocation = async (req, res) => {
    const { userId } = req.params;
    const { location_lat, location_lng } = req.body;

    if (!req.userId || req.userId.toString() !== userId) {
        return res.status(403).json({ message: "Unauthorized: User ID mismatch" });
    }

    try {
        if (!location_lat || !location_lng) {
            return res.status(400).json({ error: "Latitude and Longitude are required" });
        }

        const query = `
            UPDATE users 
            SET location_lat = $1, location_lng = $2, updated_at = NOW()
            WHERE id = $3
            RETURNING id, name, location_lat, location_lng`;

        const result = await pool.query(query, [location_lat, location_lng, userId]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({
            message: "✅ Location updated successfully",
            user: result.rows[0],
        });
    } catch (error) {
        console.error("❌ Error updating location:", error);
        res.status(500).json({ error: "Failed to update location" });
    }
};

module.exports = { verifyToken, updateUserLocation };
