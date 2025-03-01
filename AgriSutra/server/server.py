# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import joblib  # Use joblib for model loading
# import numpy as np
# import os

# app = Flask(__name__)
# CORS(app)  # Enable CORS for cross-origin requests

# # Get the current directory of server.py
# BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# # Set the correct model path (one level up in the project root)
# MODEL_PATH = os.path.join(BASE_DIR, "..", "KNN.pkl")

# try:
#     model = joblib.load(MODEL_PATH)
#     print(f" KNN Model loaded successfully from {MODEL_PATH}")
# except Exception as e:
#     print(f" Error loading model: {e}")
#     model = None

# # Sample crop descriptions (replace with a database query if needed)
# CROP_DESCRIPTIONS = {
#     "rice": "Rice is a staple food crop grown in warm climates.",
#     "maize": "Maize is a cereal grain used for food and animal feed.",
#     "cotton": "Cotton is a fiber crop used for textile production.",
#     "banana": "Bananas are a tropical fruit rich in potassium.",
#     "mango": "Mango is a sweet tropical fruit known as the 'king of fruits'."
# }

# @app.route("/predict", methods=["POST"])
# def predict():
#     if model is None:
#         return jsonify({"error": "Model is not loaded. Check the server logs."}), 500

#     try:
#         data = request.json

#         # Validate input data
#         required_fields = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"]
#         missing_fields = [field for field in required_fields if field not in data]

#         if missing_fields:
#             return jsonify({"error": f"Missing fields: {', '.join(missing_fields)}"}), 400

#         # Convert all inputs to float
#         features = np.array([[  
#             float(data["N"]), float(data["P"]), float(data["K"]),
#             float(data["temperature"]), float(data["humidity"]),
#             float(data["ph"]), float(data["rainfall"])
#         ]])

#         # Make prediction
#         predicted_crop = model.predict(features)[0]  # Get crop prediction

#         # Ensure prediction is returned as a string
#         predicted_crop = str(predicted_crop)

#         # Fetch description or use default
#         description = CROP_DESCRIPTIONS.get(predicted_crop.lower(), "Description not available.")

#         return jsonify({"recommendedCrop": predicted_crop, "description": description})

#     except Exception as e:
#         print(f"Prediction Error: {e}")
#         return jsonify({"error": str(e)}), 500

# if __name__ == "__main__":
#     port = int(os.environ.get("PORT", 8000))  # Default to 8000 if PORT is not set
#     print(f" Server starting on port {port}...")
#     app.run(host="0.0.0.0", port=port, debug=True)

import PyPDF2
import pytesseract
import re
import numpy as np
import os
from PIL import Image
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import cv2

app = Flask(__name__)
CORS(app)
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "..", "KNN.pkl")

# Load Crop Prediction Model
try:
    model = joblib.load(MODEL_PATH)
    print(f"✅ KNN Model loaded successfully from {MODEL_PATH}")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    model = None

# Function to Extract Text from PDF
def extract_text_from_pdf(pdf_file):
    try:
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text() or ""
        return text.strip() if text.strip() else "No text extracted."
    except Exception as e:
        return f"❌ Error extracting text from PDF: {e}"



def extract_text_from_image(image_file):
    try:
        print("📸 Processing image with OCR...")
        
        # Open image and convert to grayscale
        image = Image.open(image_file)
        image = image.convert("L")  # Convert to grayscale

        # Convert PIL image to OpenCV format
        open_cv_image = np.array(image)
        open_cv_image = cv2.resize(open_cv_image, (0, 0), fx=2, fy=2)  # Resize to improve OCR accuracy
        _, processed_image = cv2.threshold(open_cv_image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

        # Convert back to PIL format for Tesseract OCR
        image = Image.fromarray(processed_image)

        # Extract text
        text = pytesseract.image_to_string(image)
        print(f"📝 Extracted Text from Image: {text}")

        return text.strip() if text.strip() else "No text extracted."
    
    except Exception as e:
        print(f"❌ Error extracting text from Image: {e}")
        return f"❌ Error extracting text from Image: {e}"

# Function to Extract Soil Parameters from Text
def extract_parameters_from_text(text):
    try:
        # Define regex patterns for different parameter formats
        patterns = {
            "N": r"N[:\s]+(\d+)",   # Matches "N: 90"
            "P": r"P[:\s]+(\d+)",   # Matches "P: 45"
            "K": r"K[:\s]+(\d+)",   # Matches "K: 47"
            "temperature": r"temperature[:\s]+([\d.]+)",  # Matches "temperature: 25"
            "humidity": r"humidity[:\s]+([\d.]+)",        # Matches "humidity: 89"
            "ph": r"pH[:\s]+([\d.]+)",                   # Matches "pH: 6.5"
            "rainfall": r"rainfall[:\s]+([\d.]+)"        # Matches "rainfall: 226.5"
        }
        
        extracted_values = {}
        
        for key, pattern in patterns.items():
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                extracted_values[key] = float(match.group(1))  # Convert to float
            else:
                extracted_values[key] = None  # Mark missing values
        
        return extracted_values
    except Exception as e:
        return f"❌ Error processing extracted text: {e}"

@app.route("/predict", methods=["POST"])
def predict():
    if model is None:
        return jsonify({"error": "Model is not loaded. Check the server logs."}), 500

    try:
        if "file" in request.files:
            file = request.files["file"]
            filename = file.filename.lower()
            print(f"📂 Received File: {filename}")

            # Extract text from PDF or Image
            extracted_text = extract_text_from_pdf(file) if filename.endswith(".pdf") else extract_text_from_image(file)

            #print(f"📝 Extracted Text: {extracted_text}")

            # Extract numeric values from text
            extracted_params = extract_parameters_from_text(extracted_text)
            #print(f"📊 Extracted Parameters: {extracted_params}")

            # Check if all required parameters are extracted
            if None in extracted_params.values():
                return jsonify({
                    "error": "Could not extract all required soil parameters from the uploaded file.",
                    "extractedText": extracted_text,
                    "extractedParams": extracted_params
                }), 400

            # Convert extracted data to NumPy array for prediction
            features = np.array([[
                extracted_params["N"], extracted_params["P"], extracted_params["K"],
                extracted_params["temperature"], extracted_params["humidity"],
                extracted_params["ph"], extracted_params["rainfall"]
            ]])

            # Get model prediction
            predicted_crop = model.predict(features)[0]  # Get crop prediction
            predicted_crop = str(predicted_crop)  # Ensure it's a string

            return jsonify({
                "recommendedCrop": predicted_crop,
                "description": f"The recommended crop based on extracted data is {predicted_crop}.",
                "extractedText": extracted_text,
                "extractedParams": extracted_params
            })

        else:
            # If manual input is used instead of a file
            data = request.form
            print("📨 Received Form Data:", data)

            required_fields = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"]
            missing_fields = [field for field in required_fields if field not in data]

            if missing_fields:
                return jsonify({"error": f"Missing fields: {', '.join(missing_fields)}"}), 400

            features = np.array([[  
                float(data["N"]), float(data["P"]), float(data["K"]),
                float(data["temperature"]), float(data["humidity"]),
                float(data["ph"]), float(data["rainfall"])
            ]])

            predicted_crop = model.predict(features)[0]
            predicted_crop = str(predicted_crop)
            description = "Predicted crop based on soil data."

            return jsonify({
                "recommendedCrop": predicted_crop,
                "description": description,
                "extractedText": None
            })

    except Exception as e:
        print(f"❌ Prediction Error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
