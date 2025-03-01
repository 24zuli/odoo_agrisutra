const axios = require("axios");
const pool = require("../db");

const FLASK_API_URL = "http://localhost:8000/predict";

// Create a new connection pool using your database URL from the environment variables

async function predictCrop(req, res) {
  const { N, P, K, temperature, humidity, ph, rainfall } = req.body;

  try {
    console.log("📨 Received Request Data:", req.body);

    // Send request to the Flask API to get crop prediction
    const response = await axios.post(
      FLASK_API_URL,
      { N, P, K, temperature, humidity, ph, rainfall },
      { headers: { "Content-Type": "application/json" } }
    );

    console.log("✅ Flask Response:", response.data);

    // Extract the predicted crop from the Flask response
    const cropPrediction = response.data.recommendedCrop;
    console.log(`🌱 Predicted Crop: ${cropPrediction}`);

    // Query the database for the crop description (case-insensitive match)
    const queryText = `
      SELECT description 
      FROM crops 
      WHERE LOWER(name) = LOWER($1)
      LIMIT 1
    `;
    const result = await pool.query(queryText, [cropPrediction]);

    let description = "No description available.";
    if (result.rows.length > 0) {
      description = result.rows[0].description;
    }

    res.json({
      recommendedCrop: cropPrediction,
      description: description,
    });
  } catch (error) {
    console.error(
      "❌ Error in /predict:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({
      error:
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : "Error processing request",
    });
  }
}

module.exports = { predictCrop };
