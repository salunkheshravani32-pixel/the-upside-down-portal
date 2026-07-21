const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { getProfile } = require("../controllers/authController");

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", protect, getProfile);

module.exports = router;