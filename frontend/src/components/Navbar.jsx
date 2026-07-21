import { motion } from "framer-motion";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { playClick } from "../utils/sound";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/20 border-b border-red-900/30"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">
        {/* Logo */}
        <h1 className="text-2xl font-black text-red-600 tracking-widest cursor-pointer">
          THE UPSIDE DOWN
        </h1>

        {/* Menu */}
        <div className="hidden md:flex gap-10 text-gray-300 font-medium">
          
          <button
  onClick={() => {
    playClick();
    document.getElementById("home")?.scrollIntoView({
      behavior: "smooth",
    });
  }}
>
  Home
</button>

<button
  onClick={() => {
    playClick();

    const section = document.getElementById("story");

    if (section) {
      const y = section.offsetTop - 80; // Adjust this value
      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  }}
  className="hover:text-red-500 transition"
>
  About
</button>

<button
  onClick={() => {
    playClick();
    document.getElementById("features")?.scrollIntoView({
      behavior: "smooth",
    });
  }}
  className="hover:text-red-500 transition"
>
  Features
</button>
        </div>

        {/* Mobile Menu Button */}
<button
  onClick={() => {
    playClick();
    setMenuOpen(!menuOpen);
  }}
  className="md:hidden text-3xl text-red-500"
>
  {menuOpen ? "✕" : "☰"}
</button>

{/* Mobile Dropdown Menu */}
{menuOpen && (
  <div className="absolute top-full left-0 w-full bg-black/95 border-t border-red-900 md:hidden flex flex-col items-center py-6 gap-6">

    <button
      onClick={() => {
        playClick();
        setMenuOpen(false);
        document.getElementById("home")?.scrollIntoView({
          behavior: "smooth",
        });
      }}
      className="text-white hover:text-red-500"
    >
      Home
    </button>

    <button
      onClick={() => {
        playClick();
        setMenuOpen(false);

        const section = document.getElementById("story");
        if (section) {
          window.scrollTo({
            top: section.offsetTop - 80,
            behavior: "smooth",
          });
        }
      }}
      className="text-white hover:text-red-500"
    >
      About
    </button>

    <button
      onClick={() => {
        playClick();
        setMenuOpen(false);
        document.getElementById("features")?.scrollIntoView({
          behavior: "smooth",
        });
      }}
      className="text-white hover:text-red-500"
    >
      Features
    </button>

    <Link to="/login">
      <button
        onClick={() => {
          playClick();
          setMenuOpen(false);
        }}
        className="bg-red-700 hover:bg-red-600 px-6 py-2 rounded-lg text-white font-semibold"
      >
        Login
      </button>
    </Link>

  </div>
)}

        {/* Login Button */}
        <div className="hidden md:block">
          <Link to="/login">
          <motion.button
          onClick={() => {
            playClick();
          }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(220,38,38,0.8)",
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-700 hover:bg-red-600 px-6 py-2 rounded-lg font-semibold text-white"
          >
            Login
          </motion.button>
        </Link>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;