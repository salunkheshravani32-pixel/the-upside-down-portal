import { motion } from "framer-motion";

function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-red-900/30 py-10">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 text-center"
      >
        <h2 className="text-3xl font-black text-red-600">
          THE UPSIDE DOWN
        </h2>

        <p className="mt-4 text-gray-400">
          A cinematic React project inspired by mystery, suspense, and exploration.
        </p>

        <div className="mt-8 flex justify-center gap-6">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-red-500 transition"
          >
            GitHub
          </a>

          <a
            href="#"
            className="text-gray-400 hover:text-red-500 transition"
          >
            Contact
          </a>
        </div>

        <p className="mt-8 text-sm text-gray-600">
          © 2026 The Upside Down Portal • Built with React + Tailwind CSS + Framer Motion
        </p>
      </motion.div>
    </footer>
  );
}

export default Footer;