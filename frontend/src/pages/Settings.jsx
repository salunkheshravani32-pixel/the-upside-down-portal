import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { toast } from "react-toastify";
import { playClick } from "../utils/sound";

function Settings() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const [sound, setSound] = useState(
  localStorage.getItem("sound") !== "off"
);

const [music, setMusic] = useState(
  localStorage.getItem("music") || "on"
);

const [notifications, setNotifications] = useState(
  localStorage.getItem("notifications") !== "off"
);

const [currentPassword, setCurrentPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const changePassword = async () => {
  try {
    const token = localStorage.getItem("token");

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const res = await API.put(
      "/users/change-password",
      {
        currentPassword,
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(res.data);

    toast.success(res.data.message);

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

  } catch (err) {
    console.log(err);
    console.log(err.response);

    toast.error(err.response?.data?.message || "Something went wrong");
  }
};

  const toggleSound = () => {
  const value = !sound;
  setSound(value);
  localStorage.setItem("sound", value ? "on" : "off");
};

const toggleMusic = () => {
  const music = localStorage.getItem("music") === "off" ? "on" : "off";

  localStorage.setItem("music", music);

  if (window.portalAudio) {
    if (music === "off") {
      window.portalAudio.pause();
    } else {
      window.portalAudio.play();
    }
  }

  setMusic(music);
};

const toggleNotifications = () => {
  const value = !notifications;
  setNotifications(value);
  localStorage.setItem("notifications", value ? "on" : "off");
};

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/login");
};

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-10">

      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-red-600 mb-3">
        ⚙ Settings
      </h1>

      <p className="text-gray-400 mb-8">
        Manage your portal account.
      </p>

      {/* Profile Card */}
      <div className="bg-[#111]/80 border border-red-900 rounded-xl p-5 sm:p-8 w-full max-w-3xl mt-8">

        <h2 className="text-2xl sm:text-3xl text-red-500 font-bold mb-6">
          Profile
        </h2>

        <div className="space-y-5">

          <div>
            <p className="text-gray-400">Name</p>
            <h3 className="text-xl sm:text-2xl break-words">{user.name}</h3>
          </div>

          <div>
            <p className="text-gray-400">Email</p>
            <h3 className="break-all text-sm sm:text-base">{user.email}</h3>
          </div>

          <div className="grid grid-cols-1  sm:grid-cols-3 gap-4 sm:gap-6 mt-6">

            <div className="bg-black p-4 rounded-lg border border-red-900">
              <p className="text-gray-400">Level</p>
              <h2 className="text-3xl text-red-500">
                {user.level}
              </h2>
            </div>

            <div className="bg-black p-4 rounded-lg border border-red-900">
              <p className="text-gray-400">XP</p>
              <h2 className="text-3xl text-red-500">
                {user.xp}
              </h2>
            </div>

            <div className="bg-black p-4 rounded-lg border border-red-900">
              <p className="text-gray-400">Secrets</p>
              <h2 className="text-3xl text-red-500">
                {user.secrets}
              </h2>
            </div>

          </div>

        </div>

      </div>

      {/* Sound Settings */}
<div className="bg-[#111]/80 border border-red-900 rounded-xl p-5 sm:p-8 w-full max-w-3xl mt-8">

  <h2 className="text-2xl sm:text-3xl text-red-500 font-bold mb-6">
    🔊 Sound Settings
  </h2>

  <div className="space-y-4">

    <button
      onClick={() => {
        playClick();
        toggleSound();
      }}
      className="w-full bg-red-700 hover:bg-red-600 p-3 text-sm sm:text-base rounded-lg font-bold"
    >
      {sound ? "🔊 Sound Effects : ON" : "🔇 Sound Effects : OFF"}
    </button>

    <button
      onClick={() => {
        playClick();
        toggleMusic();
      }}
      className="w-full bg-red-700 hover:bg-red-600 p-3 text-sm sm:text-base rounded-lg font-bold"    >
      {music === "on" ? "🎵 Background Music : ON" : "🎵 Background Music : OFF"}
    </button>

    <button
      onClick={() => {
        playClick();
        toggleNotifications();
      }}
      className="w-full bg-red-700 hover:bg-red-600 p-3 text-sm sm:text-base rounded-lg font-bold"    >
      {notifications ? "🔔 Notifications : ON" : "🔕 Notifications : OFF"}
    </button>

  </div>

</div>

{/* Security */}
<div className="bg-[#111]/80 border border-red-900 rounded-xl p-5 sm:p-8 w-full max-w-3xl mt-8">

  <h2 className="text-2xl sm:text-3xl text-red-500 font-bold mb-6">
    🔒 Security
  </h2>

  <input
    type="password"
    placeholder="Current Password"
    value={currentPassword}
    onChange={(e) => setCurrentPassword(e.target.value)}
    className="w-full mb-4 p-3 text-sm sm:text-base rounded bg-black border border-gray-700 text-white"
  />

  <input
    type="password"
    placeholder="New Password"
    value={newPassword}
    onChange={(e) => setNewPassword(e.target.value)}
    className="w-full mb-4 p-3 text-sm sm:text-base rounded bg-black border border-gray-700 text-white"
  />

  <input
    type="password"
    placeholder="Confirm New Password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    className="w-full mb-4 p-3 text-sm sm:text-base rounded bg-black border border-gray-700 text-white"
  />

  <button
  onClick={() => {
    playClick();
    changePassword();
  }}
    className="w-full sm:w-auto bg-red-700 hover:bg-red-600 px-6 py-3 rounded-lg font-bold">
    Change Password
  </button>

</div>

{/* Account */}
<div className="bg-[#111]/80 border border-red-900 rounded-xl p-5 sm:p-8 w-full max-w-3xl mt-8">

  <h2 className="text-2xl sm:text-3xl text-red-500 font-bold mb-6">
    👤 Account
  </h2>

  <button
    onClick={() => {
      playClick();
      handleLogout();
    }}
    className="w-full bg-red-700 hover:bg-red-600 py-3 text-sm sm:text-base rounded-lg font-bold transition"
  >
    🚪 Logout
  </button>

</div>

    </div>
  );
}

export default Settings;