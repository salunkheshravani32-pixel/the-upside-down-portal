const missionRoutes = require("./routes/missionRoutes");
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();
const achievementRoutes = require("./routes/achievementRoutes");

const connectDB = require("./config/db");

const app = express();

const inventoryRoutes = require("./routes/inventoryRoutes");

// Connect Database
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/missions", missionRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/achievements", achievementRoutes);

app.get("/", (req, res) => {
  res.send("Upside Down Portal API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});