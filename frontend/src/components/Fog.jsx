import { motion } from "framer-motion";

function Fog() {
  return (
    <motion.div
      animate={{
        x: [-150, 150, -150],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute bottom-0 left-0 w-[200%] h-80
                 bg-gradient-to-t
                 from-gray-300/30
                 via-gray-400/20
                 to-transparent
                 blur-[80px]
                 pointer-events-none"
    />
  );
}

export default Fog;