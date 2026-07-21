const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createMission,
  getMissions,
  updateMission,
  deleteMission,
} = require("../controllers/missionController");

// Create Mission
router.post("/", protect, createMission);

// Get All Missions
router.get("/", protect, getMissions);

// Update Mission
router.put("/:id", protect, updateMission);

// Delete Mission
router.delete("/:id", protect, deleteMission);

module.exports = router;