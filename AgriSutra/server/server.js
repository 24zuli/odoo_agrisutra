const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const newsRoutes = require("./routes/news");
const marketTrendsRoute = require("./routes/marketTrends");
const profileRoute = require("./routes/profile");
const categoriesRoutes = require("./routes/categories");
// const equipmentRoutes = require("./routes/equipment"); // Import the equipment routes
const usersRoute = require("./routes/users");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000" }));

app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/profile", profileRoute);
app.use("/api/market-trends", marketTrendsRoute);
// app.use("/api/equipment", equipmentRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/users", usersRoute);

const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
