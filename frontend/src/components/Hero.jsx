import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BackgroundEffects from "./BackgroundEffects";
import Fog from "./Fog";
import forest from "../assets/images/forest.jpg";
import { playClick } from "../utils/sound";

function Hero() {
  const navigate = useNavigate();

  return (
    <section id = "home"
      className="relative min-h-screen overflow-hidden flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${forest})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      {/* Background Glow */}
      <div className="absolute w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] lg:w-[700px] lg:h-[700px] rounded-full bg-red-900/20 blur-3xl z-10"></div>

      {/* Background Effects */}
      <div className="absolute inset-0 z-20">
        <BackgroundEffects />
        <Fog />
      </div>

      {/* Animated Portal */}
      <div className="absolute inset-0 flex items-center justify-center z-30">
      </div>

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="relative z-40 text-center px-6"
      >
        <p className="uppercase tracking-[8px] text-red-500 mb-5">
          Welcome Explorer
        </p>

        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-red-600 drop-shadow-[0_0_25px_rgba(220,38,38,1)]">
          THE UPSIDE DOWN
        </h1>

        <h2 className="text-2xl sm:text-4xl md:text-6xl mt-4 text-gray-300">
         PORTAL
        </h2>
        <p className="max-w-2xl mx-auto mt-8 text-gray-300 text-base sm:text-lg leading-7 sm:leading-8 px-2">
          Enter a forgotten world filled with secrets, mysterious creatures,
          dangerous portals, and puzzles waiting to be solved.
        </p>

        <motion.button
        onClick={() => {
          playClick();
          navigate("/login");
        }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="mt-10 px-6 sm:px-10 py-3 sm:py-4 rounded-lg bg-red-700 text-white text-base sm:text-lg font-bold shadow-[0_0_35px_rgba(220,38,38,0.8)] hover:bg-red-600 transition-all duration-300"
        >
          Enter the Portal
        </motion.button>
      </motion.div>
    </section>
  );
}

export default Hero;