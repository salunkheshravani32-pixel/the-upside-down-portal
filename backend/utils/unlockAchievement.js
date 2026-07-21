const Achievement = require("../models/Achievement");

const unlockAchievement = async (
  userId,
  title,
  description,
  icon
) => {
  const exists = await Achievement.findOne({
    user: userId,
    title,
  });

  if (exists) return;

  await Achievement.create({
    user: userId,
    title,
    description,
    icon,
  });
};

module.exports = unlockAchievement;