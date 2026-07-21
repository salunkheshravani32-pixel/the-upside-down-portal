import Inventory from "./pages/Inventory";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import { useEffect  } from "react";
import ambient from "./assets/sounds/ambient.mp3";
import Achievements from "./pages/Achievements";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{
          duration: 0.35,
          ease: "easeInOut",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/achievements" element={<Achievements />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() 
{
  useEffect(() => {
  const audio = new Audio(ambient);

  audio.loop = true;
  audio.volume = 0.4;

  window.portalAudio = audio;

  if (localStorage.getItem("music") !== "off") {
    audio.play().catch(() => {});
  }

  return () => {
    audio.pause();
    audio.currentTime = 0;
  };
}, []);

  return (
    <BrowserRouter>
    <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;