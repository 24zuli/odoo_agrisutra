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

// async function getUserProfile(req, res) {
//   try {
//     const userId = req.query.userId;

//     if (!userId) {
//       console.error("❌ Missing userId in request");
//       return res.status(400).json({ error: "Missing userId" });
//     }

//     console.log("🔹 Fetching user profile for userId:", userId);

//     const result = await pool.query(
//       `SELECT id, name, username, email, gender, date_of_birth, state, district, phone_number, profile_completed, created_at, updated_at
//        FROM users WHERE id = $1`,
//       [userId]
//     );

//     if (result.rows.length === 0) {
//       console.error("❌ User not found in database");
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.json(result.rows[0]);
//   } catch (error) {
//     console.error("❌ Error fetching profile:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }
// async function getUserProfile(req, res) {
//     try {
//         const userId = req.query.userId;

//         if (!userId) {
//             console.error("❌ Missing userId in request");
//             return res.status(400).json({ error: "Missing userId" });
//         }

//         console.log("🔹 Fetching user profile for userId:", userId);

//         // ✅ Querying from `users` table
//         const result = await pool.query(
//             `SELECT id, name, username, email, gender, date_of_birth, state, district, phone_number, profile_completed, created_at, updated_at
//              FROM users WHERE id = $1`, [userId]
//         );

//         if (result.rows.length === 0) {
//             console.error("❌ User not found in database");
//             return res.status(404).json({ error: "User not found" });
//         }

//         const user = result.rows[0];

//         // ✅ Store `id`, `name`, `username`, and `email` as constants
//         const id = user.id || "Unknown ID";
//         const name = user.name || "Unknown User";
//         const username = user.username || "Unknown Username";
//         const email = user.email || "Unknown Email";

//         // ✅ Return only required fields in `res.json`
//         res.json({
//             id,
//             name,
//             username, // Returning stored username
//             email, // Returning stored email
//             gender: user.gender || null,
//             date_of_birth: user.date_of_birth || null,
//             state: user.state || null,
//             district: user.district || null,
//             phone_number: user.phone_number || null,
//             profile_completed: user.profile_completed || false,
//             created_at: user.created_at || null,
//             updated_at: user.updated_at || null,
//         });
//     } catch (error) {
//         console.error("❌ Error fetching profile:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// }
async function getUserProfile(req, res) {
    try {
        // console.log("🔹 Fetching user profile for userId:", userId);
        const userId = req.query.userId; // Ensure `userId` is passed correctly

        if (!userId) {
            console.error("❌ Missing userId in request");
            return res.status(400).json({ error: "Missing userId" });
        }

        console.log("🔹 Fetching user profile for userId:", userId);

        // Fetching user profile from database
        const result = await pool.query(
            `SELECT id, name, username, email, gender, date_of_birth, state, district, phone_number, profile_completed, created_at, updated_at
             FROM users WHERE id = $1`, [userId]
        );

        if (result.rows.length === 0) {
            console.error("❌ User not found in database");
            return res.status(404).json({ error: "User not found" });
        }

        const user = result.rows[0];

        // Ensure required fields are always returned
        res.json({
            id: user.id,
            name: user.name || "Unknown",
            username: user.username || "Unknown",
            email: user.email || "Unknown",
            gender: user.gender || null,
            date_of_birth: user.date_of_birth || null,
            state: user.state || null,
            district: user.district || null,
            phone_number: user.phone_number || null,
            profile_completed: user.profile_completed || false,
            created_at: user.created_at,
            updated_at: user.updated_at,
        });
    } catch (error) {
        console.error("❌ Error fetching profile:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// async function updateUserProfile(req, res) {
//     try {
//         const {
//             id,
//             name,
//             username,
//             email,
//             gender,
//             date_of_birth,
//             state,
//             district,
//             phone_number,
//             profile_completed,
//         } = req.body;

//         if (!id) {
//             return res.status(400).json({ error: "Missing user id" });
//         }

//         const result = await pool.query(
//             `UPDATE users
//        SET name = $2,
//            username = $3,
//            email = $4,
//            gender = $5,
//            date_of_birth = $6,
//            state = $7,
//            district = $8,
//            phone_number = $9,
//            profile_completed = $10,
//            updated_at = CURRENT_TIMESTAMP
//        WHERE id = $1
//        RETURNING id, name, username, email, gender, date_of_birth, state, district, phone_number, profile_completed, created_at, updated_at`, [
//                 id,
//                 name,
//                 username,
//                 email,
//                 gender,
//                 date_of_birth,
//                 state,
//                 district,
//                 phone_number,
//                 profile_completed,
//             ]
//         );

//         if (result.rows.length === 0) {
//             return res.status(404).json({ error: "User not found or update failed" });
//         }

//         res.json(result.rows[0]);
//     } catch (error) {
//         console.error("Error updating profile:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// }
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
            return res.status(400).json({ error: "Missing user ID" });
        }

        console.log("🔹 Updating profile for user ID:", id);

        // Ensure we only update the provided fields without setting them to null
        const result = await pool.query(
            `UPDATE users 
             SET name = COALESCE($2, name),
                 username = COALESCE($3, username),
                 email = COALESCE($4, email),
                 gender = COALESCE($5, gender),
                 date_of_birth = COALESCE($6, date_of_birth),
                 state = COALESCE($7, state),
                 district = COALESCE($8, district),
                 phone_number = COALESCE($9, phone_number),
                 profile_completed = COALESCE($10, profile_completed),
                 updated_at = CURRENT_TIMESTAMP
             WHERE id = $1
             RETURNING id, name, username, email, gender, date_of_birth, state, district, phone_number, profile_completed, created_at, updated_at`, [
                id,
                name || null,
                username || null,
                email || null,
                gender || null,
                date_of_birth || null,
                state || null,
                district || null,
                phone_number || null,
                profile_completed !== undefined ? profile_completed : false,
            ]
        );

        if (result.rows.length === 0) {
            console.error("❌ Update failed: User not found");
            return res
                .status(404)
                .json({ error: "User not found or no changes made" });
        }

        console.log("✅ User profile updated successfully:", result.rows[0]);

        res.json({
            message: "Profile updated successfully",
            user: result.rows[0],
        });
    } catch (error) {
        console.error("❌ Error updating profile:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    verifyToken,
    getUserProfile,
    updateUserProfile,
};