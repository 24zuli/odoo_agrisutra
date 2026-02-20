const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      console.error("Unauthorized Access: No token provided");
      return res
        .status(401)
        .json({ error: "Unauthorized. No token provided." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("Invalid Token:", err.message);
        return res
          .status(403)
          .json({ error: "Forbidden. Invalid or expired token." });
      }

      req.user = decoded;
      console.log(" Token Verified, User ID:", req.user.id);
      next();
    });
  } catch (error) {
    console.error(" Error in authentication middleware:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = authenticateToken;
