import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";
import { playClick, playSuccess, } from "../utils/sound";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);

      const res = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      //alert(res.data.message);
      toast.success("Registration Successful!");
      playSuccess();

      setName("");
      setEmail("");
      setPassword("");

    } catch (error) {
      toast.error(error.response?.data?.message || 
        "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] lg:w-[700px] lg:h-[700px] rounded-full bg-red-700/10 blur-3xl"></div>

      {/* Register Card */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-[95%] max-w-[430px] bg-[#111111]/90 backdrop-blur-lg border border-red-900 rounded-2xl p-6 sm:p-8 md:p-10 shadow-[0_0_40px_rgba(220,38,38,0.2)]"
              >
        <h1 className="text-3xl sm:text-4xl font-black text-red-600 text-center">
          REGISTER
        </h1>

        <p className="text-gray-400 text-center mt-2 mb-8">
          Create your Portal Account
        </p>

        {/* Name */}
        <input
          type="text"
          placeholder="Full Name"
          value = {name}
          onChange = {(e) => setName(e.target.value)}
          className="w-full mb-5 bg-black border border-red-900 rounded-lg px-4 py-3 text-white outline-none focus:border-red-500 focus:shadow-[0_0_15px_rgba(220,38,38,0.6)]"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email Address"
          value = {email}
          onChange = {(e) => setEmail(e.target.value)}
          className="w-full mb-5 bg-black border border-red-900 rounded-lg px-4 py-3 text-white outline-none focus:border-red-500 focus:shadow-[0_0_15px_rgba(220,38,38,0.6)]"
        />

        {/* Password */}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value = {password}
            onChange = {(e) => setPassword(e.target.value)}
            className="w-full bg-black border border-red-900 rounded-lg px-4 py-3 pr-16 text-white outline-none focus:border-red-500 focus:shadow-[0_0_15px_rgba(220,38,38,0.6)]"
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

        {/* Register Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick = {handleRegister}
          disabled = {loading}
          className="w-full bg-red-700 hover:bg-red-600 text-white py-3 rounded-lg font-bold"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </motion.button>

        {/* Login Link */}
        <Link
          to="/login"
          className="block text-center mt-6 text-gray-400 hover:text-red-500 transition"
        >
          Already have an account? Login
        </Link>
      </motion.div>

    </div>
  );
}

export default Register;