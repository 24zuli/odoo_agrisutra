from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib  # Use joblib for model loading
import numpy as np
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Get the current directory of server.py
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Set the correct model path (one level up in the project root)
MODEL_PATH = os.path.join(BASE_DIR, "..", "KNN.pkl")

try:
    model = joblib.load(MODEL_PATH)
    print(f"✅ KNN Model loaded successfully from {MODEL_PATH}")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    model = None

# Sample crop descriptions (replace with a database query if needed)
CROP_DESCRIPTIONS = {
    "rice": "Rice is a staple food crop grown in warm climates.",
    "maize": "Maize is a cereal grain used for food and animal feed.",
    "cotton": "Cotton is a fiber crop used for textile production.",
    "banana": "Bananas are a tropical fruit rich in potassium.",
    "mango": "Mango is a sweet tropical fruit known as the 'king of fruits'."
}

@app.route("/predict", methods=["POST"])
def predict():
    if model is None:
        return jsonify({"error": "Model is not loaded. Check the server logs."}), 500

    try:
        data = request.json

        # Validate input data
        required_fields = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"]
        missing_fields = [field for field in required_fields if field not in data]

        if missing_fields:
            return jsonify({"error": f"Missing fields: {', '.join(missing_fields)}"}), 400

        # Convert all inputs to float
        features = np.array([[  
            float(data["N"]), float(data["P"]), float(data["K"]),
            float(data["temperature"]), float(data["humidity"]),
            float(data["ph"]), float(data["rainfall"])
        ]])

        # Make prediction
        predicted_crop = model.predict(features)[0]  # Get crop prediction

        # Ensure prediction is returned as a string
        predicted_crop = str(predicted_crop)

        # Fetch description or use default
        description = CROP_DESCRIPTIONS.get(predicted_crop.lower(), "Description not available.")

        return jsonify({"recommendedCrop": predicted_crop, "description": description})

    except Exception as e:
        print(f"Prediction Error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))  # Default to 8000 if PORT is not set
    print(f" Server starting on port {port}...")
    app.run(host="0.0.0.0", port=port, debug=True)
