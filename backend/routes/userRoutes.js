const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const { getUserProfile, changePassword, } = require("../controllers/userController");

router.get("/profile", protect, getUserProfile);

router.put("/change-password", protect, changePassword);

module.exports = router;