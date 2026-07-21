import { useNavigate } from "react-router-dom";
import BackgroundEffects from "../components/BackgroundEffects";
import Fog from "../components/Fog";
import API from "../api/axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { playClick, playSuccess, playDelete, playComplete, } from "../utils/sound";

function Dashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [profile, setProfile] = useState(null);
  const [missions, setMissions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchMissions = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await API.get("/missions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setMissions(res.data);
  } catch (error) {
    console.log(error);
  }
};

const fetchProfile = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await API.get("/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setProfile(res.data);
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
    fetchMissions();
    fetchProfile();
  }, [navigate]);

  const createMission = async () => {
  try {
    const token = localStorage.getItem("token");

    console.log("🔥 createMission triggered");
    console.log("Title:", title);
    console.log("Description:", description);

    const res = await API.post(
      "/missions",
      {
        title,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("✅ Mission created:", res.data);

    setTitle("");
    setDescription("");
    setShowModal(false);

    fetchMissions();
    toast.success("Mission Created Successfully");
    playSuccess();
  } 
  catch (error) {
  console.log("❌ FULL ERROR:", error);
  console.log("❌ RESPONSE:", error.response?.data);
  toast.error(error.response?.data?.message || "Failed to create mission");
}
};

const deleteMission = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await API.delete(`/missions/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchMissions();
    toast.success("Mission Deleted");
    playDelete();

  } catch (error) {
    console.log(error);
    toast.error("Failed to delete mission");
  }
};

const completeMission = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await API.put(
      `/missions/${id}`,
      {
        status: "Completed",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchMissions();
    fetchProfile();
    toast.success("Mission Completed");
    playComplete();

  } catch (error) {
    console.log(error);
    toast.error("Failed to complete mission");
  }
};

 const editMission = (mission) => {
  setEditingId(mission._id);
  setTitle(mission.title);
  setDescription(mission.description);
  setShowModal(true);
};

const updateMission = async () => {
  try {
    const token = localStorage.getItem("token");

    await API.put(
      `/missions/${editingId}`,
      {
        title,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setTitle("");
    setDescription("");
    setEditingId(null);
    setShowModal(false);

    fetchMissions();
    toast.success("Mission Updated");

  } catch (error) {
    console.log(error);
    toast.error("Failed to update mission");
  }
};

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const completedMissions = missions.filter(
    (mission) => mission.status ==="Completed"
  ).length;

  const portalEnergy = profile ? profile.xp % 100 === 0 && profile.xp > 0 ? 100 : profile.xp % 100 : 0;

  return (
  <div className="relative min-h-screen bg-black text-white flex flex-col lg:flex-row overflow-hidden">
    
    {/* Background Effects */}
    <div className="absolute inset-0 z-0">
      <BackgroundEffects />
      <Fog />
    </div>

    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black/60 z-0"></div>

    {/* Sidebar */}
    {sidebarOpen && (
  <div
    className="fixed inset-0 bg-black/60 z-40 lg:hidden"
    onClick={() => setSidebarOpen(false)}
  />
)}
    <aside
  className={`fixed lg:static top-0 left-0 h-screen w-56 lg:w-72 bg-black/95 lg:bg-black/60 backdrop-blur-md border-r border-red-900 shadow-2xl p-6 z-50 transform transition-transform duration-300 ${
    sidebarOpen ? "translate-x-0" : "-translate-x-full"
  } lg:translate-x-0`}
>

  <div className="flex justify-end lg:hidden mb-4">
  <button
    onClick={() => {
      playClick();
      setSidebarOpen(false);
    }}
    className="text-3xl text-red-500"
  >
    ✕
  </button>
</div>

      <h1 className="text-2xl lg:text-3xl font-black text-red-600 mb-8 text-center lg:text-left">
        UPSIDE DOWN
      </h1>

      <nav className="flex flex-col gap-5">
        <button
 onClick={() => {
  playClick();
  setSidebarOpen(false);
  document.getElementById("dashboard")?.scrollIntoView({
    behavior: "smooth",
  });
}}
  className="w-full text-left whitespace-nowrap text-base lg:text-lg hover:text-red-500 transition"
>
  🏠 Dashboard
</button>

        <button
  onClick={() => {
  playClick();
  setSidebarOpen(false);
  document.getElementById("missions")?.scrollIntoView({
    behavior: "smooth",
  });
}}
  className="w-full text-left whitespace-nowrap text-base lg:text-lg hover:text-red-500 transition"
>
  🎯 Missions
</button>


        <button 
        onClick={() => {
          playClick();
          setSidebarOpen(false);
          navigate("/inventory");
        }}
        className="w-full text-left whitespace-nowrap text-base lg:text-lg hover:text-red-500 transition">
          🎒 Inventory
        </button>

        <button
  onClick={() => {
    playClick();
    setSidebarOpen(false);
    navigate("/achievements");
  }}
  className="w-full text-left whitespace-nowrap text-base lg:text-lg hover:text-red-500 transition"
>
  🏆 Achievements
</button>

        <button 
        onClick={() => {
          playClick();
          setSidebarOpen(false);
          navigate("/settings");
        }}
        className="w-full text-left whitespace-nowrap text-base lg:text-lg hover:text-red-500 transition">
          ⚙ Settings
        </button>
      </nav>

      <div className="mt-10 border-t border-red-900 pt-6">
  <button
    onClick={() => {
      playClick();
      handleLogout();
    }}
    className="w-full bg-red-700 hover:bg-red-600 py-3 rounded-lg font-bold transition"
  >
    🚪 Logout
  </button>
</div>

    </aside>

    {sidebarOpen && (
  <div
    className="fixed inset-0 bg-black/60 z-40 lg:hidden"
    onClick={() => setSidebarOpen(false)}
  />
)}

    {/* Main Content */}

    <main className="relative z-10 flex-1 p-4 sm:p-6 lg:p-10">

      <div className="lg:hidden flex justify-between items-center mb-6">
  <button
    onClick={() => {
      playClick();
      setSidebarOpen(!sidebarOpen);
    }}
    className="text-3xl text-red-500"
  >
    {sidebarOpen ? "✕" : "☰"}
  </button>
</div>

      <div id="dashboard">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-red-600">
    Welcome, {user?.name} 👋
  </h1>

  <p className="text-gray-400 mt-3">
    The portal has recognized your presence.
  </p>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-10">

  <div className="bg-[#111]/80 border border-red-900 rounded-xl p-6 hover:scale-105 transition">
    <h2 className="text-gray-400">🎯 Missions</h2>
    <p className="text-3xl sm:text-4xl font-bold text-red-500 mt-3">
      {missions.length}
    </p>
  </div>

  <div className="bg-[#111]/80 border border-red-900 rounded-xl p-6 hover:scale-105 transition">
    <h2 className="text-gray-400">🏆 Level</h2>
    <p className="text-3xl sm:text-4xl font-bold text-red-500 mt-3">
      {profile?.level || 1}
    </p>
  </div>

  <div className="bg-[#111]/80 border border-red-900 rounded-xl p-6 hover:scale-105 transition">
    <h2 className="text-gray-400">📜 Secrets</h2>
    <p className="text-3xl sm:text-4xl font-bold text-red-500 mt-3">
      {profile?.secrets || 0}
    </p>
  </div>

  <div className="bg-[#111]/80 border border-red-900 rounded-xl p-6 hover:scale-105 transition">

  <h2 className="text-gray-400">⚡ Portal Energy</h2>

  <p className="text-3xl sm:text-4xl font-bold text-red-500 mt-3">
    {portalEnergy}%
  </p>

  <div className="w-full bg-gray-800 rounded-full h-3 mt-5">

    <div
      className="bg-red-600 h-3 rounded-full transition-all duration-700"
      style={{
        width: `${portalEnergy}%`,
      }}
    ></div>

  </div>

</div>

  <div className="bg-[#111]/80 border border-red-900 rounded-xl p-6 hover:scale-105 transition duration-300">
  <h2 className="text-gray-400">⚡ XP</h2>

  <p className="text-3xl sm:text-4xl font-bold text-red-500 mt-3">
    {profile?.xp || 0}
  </p>
</div>

</div>

<div id="missions" className="mt-12">
  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
    <h2 className="text-3xl font-bold text-red-500">
    Active Missions
  </h2>

  <button
  onClick={() => {
    playClick();
  setEditingId(null);
  setTitle("");
  setDescription("");
  setShowModal(true);
}}
    className="bg-red-700 hover:bg-red-600 px-5 py-2 rounded-lg font-bold transition">
    + Add Mission
  </button>
</div>

  <div className="space-y-4">

  {missions.length === 0 ? (

    <div className="bg-[#111]/80 border border-red-900 rounded-xl p-10 text-center">

      <h2 className="text-2xl font-bold text-red-500">
        No Missions Yet
      </h2>

      <p className="text-gray-400 mt-3">
        Create your first mission to begin your journey into the Upside Down.
      </p>

    </div>

  ) : (

    missions.map((mission) => (
      <div
        key={mission._id}
        className="bg-[#111]/80 border border-red-900 rounded-xl p-6 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5"
      >
        <div>
          <h3 className="text-lg sm:text-xl font-semibold break-words">
            {mission.title}
          </h3>

          <p className="text-gray-400 break-words">
            {mission.description}
          </p>

          <p className="text-sm text-gray-500 mt-2">
  Created: {new Date(mission.createdAt).toLocaleDateString()}
</p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 justify-end">

  <span
    className={`px-3 py-1 rounded-full text-sm ${
      mission.status === "Completed"
        ? "bg-green-600"
        : "bg-yellow-600"
    }`}
  >
    {mission.status}
  </span>

  {mission.status !== "Completed" && (
  <button
    onClick={() => completeMission(mission._id)}
    className="bg-green-700 hover:bg-green-600 px-3 py-2 rounded-lg shrink-0"
  >
    ✅
  </button>
)}

<button
  onClick={() => {
    playClick();
    editMission(mission);
  }}
  className="bg-blue-700 hover:bg-blue-600 px-3 px-2 rounded-lg shrink-0"
>
  ✏️
</button>

  <button
  onClick={() => {
    if (window.confirm("Are you sure you want to delete this mission?")) {
      deleteMission(mission._id);
    }
  }}
  className="bg-red-700 hover:bg-red-600 px-3 py-1 rounded-lg"
>
  🗑
</button>

</div>
      </div>
    ))
  )}
  </div>
</div>
{showModal && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div className="bg-[#111] border border-red-900 rounded-xl p-6 sm:p-8 w-[95%] max-w-[420px]">

      <h2 className="text-2xl font-bold text-red-500 mb-6">
        {editingId ? "Edit Mission" : "Create Mission"}
      </h2>

      <input
  type="text"
  placeholder="Mission Title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  className="w-full mb-4 bg-black border border-red-900 rounded-lg px-4 py-3 text-white"
/>

      <textarea
  placeholder="Mission Description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  className="w-full mb-6 bg-black border border-red-900 rounded-lg px-4 py-3 text-white"
  rows="4"
/>

      <div className="flex flex-col sm:flex-row justify-end gap-3">
        <button
          onClick={() => {
            playClick();
            setShowModal(false);
            setEditingId(null);
            setTitle("");
            setDescription("");
}}
          className="w-full sm:w-auto px-4 py-2 rounded-lg bg-gray-700 transition"
        >
          Cancel
        </button>
        <button
  onClick={editingId ? updateMission : createMission}
  className="w-full sm:w-auto px-4 py-2 rounded-lg bg-red-700 hover:bg-red-600 transition"
>
  {editingId ? "Update Mission" : "Create Mission"}
</button>

      </div>
    </div>
  </div>
)}

<footer className="mt-16 border-t border-red-900 pt-6 text-center text-gray-500">

  <p className="text-sm">
    The Upside Down Portal © 2026
  </p>

  <p className="text-xs mt-2">
    Built using React • Node.js • Express • MongoDB
  </p>

</footer>

    </main>

  </div>
);
}

export default Dashboard;