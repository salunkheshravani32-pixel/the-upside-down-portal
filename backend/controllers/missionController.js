const Mission = require("../models/Mission");
const User = require("../models/User");
const unlockAchievement = require("../utils/unlockAchievement");

// Create Mission
const createMission = async (req, res) => {
  console.log("✅ createMission controller reached");
  try {
    const mission = await Mission.create({
      title: req.body.title,
      description: req.body.description,
      status: "Pending",
      user: req.user.id,
    });

    res.status(201).json(mission);
  } catch (error) {
    console.log("CREATE MISSION ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Missions
const getMissions = async (req, res) => {
  try {
    const missions = await Mission.find({
      user: req.user.id,
    });

    res.json(missions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Mission
const updateMission = async (req, res) => {
  try {
    console.log("Update Mission API Called");
    const oldMission = await Mission.findById(req.params.id);

    const mission = await Mission.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (
      req.body.status === "Completed" &&
      oldMission.status !== "Completed"
    ) {
      console.log("Mission Completed!");
      console.log("Awarding XP...");
      const user = await User.findById(req.user.id);

      user.xp += 20;
      console.log("XP after update:", user.xp);
      user.level = Math.floor(user.xp / 100) + 1;

      const completedCount = await Mission.countDocuments({
        user: req.user.id,
        status: "Completed",
      });

      if (completedCount >= 1) {
  await unlockAchievement(
    req.user.id,
    "First Blood",
    "Complete your first mission",
    "🏅"
  );
}

if (completedCount >= 5) {
  await unlockAchievement(
    req.user.id,
    "Mission Hunter",
    "Complete 5 missions",
    "⚔️"
  );
}

if (completedCount >= 10) {
  await unlockAchievement(
    req.user.id,
    "Elite Hunter",
    "Complete 10 missions",
    "👑"
  );
}
      user.secrets = Math.floor(completedCount / 5);

      await user.save();
    }

    res.json(mission);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Mission
const deleteMission = async (req, res) => {
  try {
    await Mission.findByIdAndDelete(req.params.id);

    const user = await User.findById(req.user.id);

    const completedCount = await Mission.countDocuments({
      user: req.user.id,
      status: "Completed",
    });

    user.xp = completedCount * 20;
    user.level = Math.floor(user.xp / 100) + 1;
    user.secrets = Math.floor(completedCount / 5);

    await user.save();

    res.json({
      message: "Mission deleted successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createMission,
  getMissions,
  updateMission,
  deleteMission,
};