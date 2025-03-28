// const axios = require("axios");
// const pool = require("../db");

// const FLASK_API_URL = "http://localhost:8000/predict";

// // Create a new connection pool using your database URL from the environment variables

// async function predictCrop(req, res) {
//   const { N, P, K, temperature, humidity, ph, rainfall } = req.body;

//   try {
//     console.log("📨 Received Request Data:", req.body);

//     // Send request to the Flask API to get crop prediction
//     const response = await axios.post(
//       FLASK_API_URL,
//       { N, P, K, temperature, humidity, ph, rainfall },
//       { headers: { "Content-Type": "application/json" } }
//     );

//     console.log(" Flask Response:", response.data);

//     // Extract the predicted crop from the Flask response
//     const cropPrediction = response.data.recommendedCrop;
//     console.log(` Predicted Crop: ${cropPrediction}`);

//     // Query the database for the crop description (case-insensitive match)
//     const queryText = `
//       SELECT description
//       FROM crops
//       WHERE LOWER(name) = LOWER($1)
//       LIMIT 1
//     `;
//     const result = await pool.query(queryText, [cropPrediction]);

//     let description = "No description available.";
//     if (result.rows.length > 0) {
//       description = result.rows[0].description;
//     }

//     res.json({
//       recommendedCrop: cropPrediction,
//       description: description,
//     });
//   } catch (error) {
//     console.error(
//       " Error in /predict:",
//       error.response ? error.response.data : error.message
//     );
//     res.status(500).json({
//       error:
//         error.response && error.response.data && error.response.data.error
//           ? error.response.data.error
//           : "Error processing request",
//     });
//   }
// }

// module.exports = { predictCrop };
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");
const pool = require("../db");

const FLASK_API_URL = "http://localhost:8000/predict";

// Configure Multer Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const filename = timestamp + "_" + file.originalname;
    cb(null, filename);
  },
});

const upload = multer({ storage });

// Fetch Crop Description from Database
async function getCropDescription(cropName) {
  try {
    console.log("🔍 Fetching description for crop:", cropName);

    const queryText = `
            SELECT description 
            FROM crops 
            WHERE LOWER(name) = LOWER($1)
            LIMIT 1
        `;
    const result = await pool.query(queryText, [cropName]);

    if (result.rows.length > 0) {
      return result.rows[0].description;
    } else {
      console.warn("⚠ No description found for crop:", cropName);
      return "No description available.";
    }
  } catch (error) {
    console.error("❌ Database Error:", error.message);
    return "Error retrieving crop description.";
  }
}

// Main Prediction Handler
async function predictCrop(req, res) {
  const { N, P, K, temperature, humidity, ph, rainfall, user_id } = req.body;
  const file = req.file;

  try {
    console.log("📨 Received Request Data:", req.body);
    console.log("📂 Uploaded File:", file ? file.filename : "No file uploaded");

    const formData = new FormData();

    if (file) {
      formData.append("file", fs.createReadStream(file.path));
      console.log("📄 Sending File to Flask:", file.filename);
    } else {
      formData.append("N", N);
      formData.append("P", P);
      formData.append("K", K);
      formData.append("temperature", temperature);
      formData.append("humidity", humidity);
      formData.append("ph", ph);
      formData.append("rainfall", rainfall);
    }

    console.log("🚀 Sending Request to Flask API...");
    const response = await axios.post(FLASK_API_URL, formData, {
      headers: formData.getHeaders(),
    });

    console.log("✅ Flask Response:", response.data);
    const recommendedCrop = response.data.recommendedCrop;
    const extractedText = response.data.extractedText;

    const description = await getCropDescription(recommendedCrop);

    // Optional: Store file upload record
    if (file) {
      const insertFileQuery = `
                INSERT INTO uploads (user_id, filename, filepath, uploaded_at) 
                VALUES ($1, $2, $3, NOW()) RETURNING *;
            `;
      await pool.query(insertFileQuery, [
        user_id || null,
        file.filename,
        file.path,
      ]);
    }

    res.json({
      recommendedCrop: recommendedCrop,
      description: description,
      extractedText: extractedText || null,
      uploadedFile: file ? file.filename : null,
    });
  } catch (error) {
    console.error(
      "❌ Error in /predict:",
      error.response ? error.response.data : error.message
    );

    res.status(500).json({
      error:
        (error.response && error.response.data && error.response.data.error) ||
        "Error processing request",
    });
  }
}

module.exports = { predictCrop, upload };
