import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { playClick, playSuccess, } from "../utils/sound";
import ambient from "../assets/sounds/ambient.mp3";

function Login() {
const [showPassword, setShowPassword] = useState(false);
const [loading, setLoading] = useState(false);
const navigate = useNavigate();
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const fullText = "HAWKINS LAB TERMINAL INITIALIZING...";
const [displayText, setDisplayText] = useState("");

useEffect(() => {
  let index = 0;

  const interval = setInterval(() => {
    setDisplayText(fullText.slice(0, index + 1));
    index++;

    if (index === fullText.length) {
      clearInterval(interval);
    }
  }, 50);

  return () => clearInterval(interval);
}, []);

const handleLogin = async () => {
  try {
    setLoading(true);

    const res = await API.post("/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    //alert(res.data.message);
    toast.success("Login Successful!");
    playSuccess();

    const bg = new Audio(ambient);
bg.loop = true;
bg.volume =  1.0;

window.portalAudio = bg;

if (localStorage.getItem("music") !== "off")
{
  bg.play().catch(() => {});
}

    navigate("/dashboard");

  } catch (error) {
    toast.error(error.response?.data?.message || "Login Failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] lg:w-[700px] lg:h-[700px] rounded-full bg-red-700/10 blur-3xl"></div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-[95%] max-w-[420px] bg-[#111111]/90 backdrop-blur-lg border border-red-900 rounded-2xl p-6 sm:p-8 md:p-10 shadow-[0_0_40px_rgba(220,38,38,0.2)]"
      >
        <h1 className="text-3xl sm:text-4xl font-black text-red-600 text-center">
          LOGIN
        </h1>

        <p className="text-green-400 text-center mt-2 mb-8 font-mono text-sm">
  {displayText}
  <span className="animate-pulse">|</span>
</p>

        {/* Email */}
        <input
  type="email"
  placeholder="Email Address"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full mb-5 bg-black border border-red-900 rounded-lg px-4 py-3 text-white outline-none focus:border-red-500 focus:shadow-[0_0_15px_rgba(220,38,38,0.6)]"
/>

        {/* Password */}
        <div className="relative mb-6">
  <input
  type={showPassword ? "text" : "password"}
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full bg-black border border-red-900 rounded-lg px-4 py-3 pr-14 text-white outline-none focus:border-red-500 focus:shadow-[0_0_15px_rgba(220,38,38,0.6)]"
/>

  <button
    type="button"
    onClick={() => {
      playClick();
      setShowPassword(!showPassword)
    }}
    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
  >
    {showPassword ? "Hide" : "Show"}
  </button>
</div>

        {/* Login Button */}
        <motion.button
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.96 }}
  onClick={handleLogin}
  disabled={loading}
  className="w-full bg-red-700 hover:bg-red-600 text-white py-3 rounded-lg font-bold transition"
>
  {loading ? "Accessing..." : "Access Portal"}
</motion.button>
      

        {/* Back */}
        <div className="mt-6 text-center space-y-3">
  <Link
    to="/register"
    className="block text-red-500 hover:text-red-400 transition"
  >
    Don't have an account? Register
  </Link>

  <Link
    to="/"
    className="block text-gray-400 hover:text-red-500 transition"
  >
    ← Return to Home
  </Link>
</div>
      </motion.div>
    </div>
  );
}

export default Login;