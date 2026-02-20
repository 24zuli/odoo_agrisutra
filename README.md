**Project Name** : AgriSutra  
**Team No** : 39  
**Team Name** : Fierces'  
**Team Leader** : Zuli Dobariya - 22AIML009

[https://drive.google.com/file/d/YOUR_VIDEO_ID/view](https://drive.google.com/drive/folders/1Kq7FHHe0k47sdOoSNX4BOsTMzxveMYUZ?usp=drive_link)

# 🌾 AgriSutra - Empowering Farmers with Technology

<div style="display: flex; justify-content: space-between;">
    <img src="./image1.png" alt="Image 1" width="300" height="400">
    <img src="./image2.png" alt="Image 2" width="300" height="400">
    <img src="./image3.png" alt="Image 3" width="300" height="400">
</div>
<div style="display: flex; justify-content: space-between;">
<img src="./image4.png" alt="Image 4" width="300" height="400">
<img src="./image5.png" alt="Image 5" width="300" height="400">
</div>

# AgriSutra - Smart Farming Solutions

AgriSutra is a comprehensive agricultural platform designed to empower farmers with data-driven insights. It features crop recommendation based on soil parameters, market trends analysis, scheme information, and an interactive chatbot.

## Core Features

- **Crop Prediction**: ML-based recommendation using NPK values and climate data.
- **Market Trends**: Real-time insights into agricultural market prices and trends.
- **Schemes & News**: Stay updated with the latest government schemes and agricultural news.
- **Smart Chatbot**: AI-powered assistant for farming queries.
- **OCR Support**: Extract soil data directly from PDF reports or images using Tesseract OCR.

---

## Technical Stack

- **Frontend**: [Next.js](https://nextjs.org/) (React)
- **Backend API**: [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/)
- **Machine Learning Server**: [Python](https://www.python.org/) with [Flask](https://flask.palletsprojects.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **OCR Engine**: [Tesseract OCR](https://github.com/tesseract-ocr/tesseract)

---

## Setup & Installation

### 1. Prerequisites

Ensure you have the following installed:

- **Node.js** (v18 or later)
- **Python** (v3.9 or later)
- **PostgreSQL**
- **Tesseract OCR** (For the ML server's OCR features)
  - _Windows_: Download from [UB-Mannheim](https://github.com/UB-Mannheim/tesseract/wiki).
  - _macOS_: `brew install tesseract`

### 2. Database Setup

1. Create a PostgreSQL database named `odooagrisutra`.
2. Ensure you have the credentials (user and password) ready.

### 3. Environment Configuration

Create a `.env` file in the `AgriSutra/backend` directory with the following variables:

```env
PORT=3001
DATABASE_URL="postgresql://username:password@localhost:5432/odooagrisutra"
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key
NEXT_PUBLIC_TOMORROW_API_KEY=your_tomorrow_api_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_app_password
```

### 4. Install Dependencies

You can now install dependencies for both the frontend and backend with a single command from the `AgriSutra` (root) folder:

```bash
cd AgriSutra
npm run install:all
```

---

## Running the Application

AgriSutra is now split into a **Frontend** and **Backend**. You can run both from the root `AgriSutra` folder:

### Start Frontend (Next.js)

```bash
npm run dev:frontend
```

_Frontend will be available at `http://localhost:3000`._

### Start Backend (Express & Flask)

```bash
npm run dev:backend
```

_The API runs on `http://localhost:3001` and the Flask server on `http://localhost:8000`._

---

## 🌍 Multi-Language Support

AgriSutra supports **English, Gujarati, Hindi, and Marathi** out of the box. We have implemented an automated translation pipeline:

- **Auto-Extraction**: New text added to the code is automatically detected.
- **AI Translation**: Use a single command to translate the entire app into any Indian language.

To update translations after adding new features:

```bash
cd frontend
npm run i18n:update
```

---

## Project Structure

```text
AgriSutra/
├── frontend/           # Next.js Application
│   ├── app/            # Pages & Routes
│   ├── components/     # UI Components
│   ├── locales/        # Translation JSONs (EN, GU, HI, MR)
│   └── scripts/        # Translation Automation
├── backend/            # Server-side Logic
│   ├── models/         # Database Schema
│   ├── routes/         # API Endpoints
│   ├── ML_Models/      # AI Models (KNN, etc.)
│   ├── server.js       # Node Server
│   └── server.py       # Flask AI/ML Server
└── package.json        # Root Orchestration
```

---

## 🏛 Civic Tech for Farmers

We chose the **Civic Tech** category because AgriSutra solves real-life problems for farmers, particularly small-scale ones. 🌍 By providing essential farming insights, we **empower rural communities and promote sustainable agriculture**.

### 📊 Quick Facts:

- 📡 **Digital advisory services** can **increase crop yield by 20-30%** 🌾
- 📉 Only **30-40% of eligible farmers** successfully access government subsidies
- 🚜 **Post-harvest losses** account for up to **40% of total produce**

AgriSutra helps farmers overcome these challenges with **simple and effective technology**. ✅

---

## 💻 Tech Stack

### 🖥 Frontend:

- ⚡ **Next.js** – Fast, scalable web apps
- 🛠 **TypeScript** – Ensures clean, bug-free code

### 🚀 Backend:

- 🌐 **Express.js (JavaScript)** – Manages API requests
- 🐍 **Flask (Python)** – Runs AI-powered insights

### 🗄 Database:

- 🗃 **PostgreSQL** – Stores structured farming data

### 🧠 Machine Learning:

- 🤖 **Python (ML models)** – Provides smart recommendations
- 🔥 **Flask API** – Serves AI insights to users

---

## 📢 Join the AgriSutra Revolution! 🚜

We believe **technology can transform farming** and make life easier for millions of farmers. **AgriSutra is built for them!** ❤️
