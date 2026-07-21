const Achievement = require("../models/Achievement");

const getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find({
      user: req.user.id,
    });

    res.json(achievements);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAchievements,
};