import { useEffect, useState } from "react";
import API from "../api/axios";

function Achievements() {
  const [achievements, setAchievements] = useState([]);

  const fetchAchievements = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/achievements", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAchievements(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const unlocked = (title) =>
    achievements.find((a) => a.title === title);

  const allAchievements = [
    {
      title: "First Blood",
      description: "Complete your first mission",
      icon: "🏅",
    },
    {
      title: "Mission Hunter",
      description: "Complete 5 missions",
      icon: "⚔️",
    },
    {
      title: "Elite Hunter",
      description: "Complete 10 missions",
      icon: "👑",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-10">

      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-red-600 mb-3">
        🏆 Achievements
      </h1>

      <p className="text-gray-400 mb-10">
        Unlock milestones as you survive the Upside Down.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

        {allAchievements.map((achievement) => {
          const isUnlocked = unlocked(achievement.title);

          return (
            <div
              key={achievement.title}
              className={`rounded-xl p-5 sm:p-8 border transition hover:scale-[1.02] sm:hover:scale-105 ${
                isUnlocked
                  ? "bg-[#111] border-red-900"
                  : "bg-gray-900 border-gray-700 opacity-50"
              }`}
            >
              <div className="text-5xl sm:text-6xl mb-4">
                {achievement.icon}
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-red-500">
                {achievement.title}
              </h2>

              <p className="text-gray-400 mt-3">
                {achievement.description}
              </p>

              <p className="mt-6 font-bold">
                {isUnlocked
                  ? "✅ Unlocked"
                  : "🔒 Locked"}
              </p>
            </div>
          );
        })}

      </div>

    </div>
  );
}

export default Achievements;