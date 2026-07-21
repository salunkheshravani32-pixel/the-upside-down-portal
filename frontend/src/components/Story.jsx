import { motion } from "framer-motion";

function Story() {
  return (
    <section
    id="story"
    className="min-h-screen flex items-center py-16 sm:py-24 px-5 sm:px-8 bg-black text-white scroll-mt-24"
>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto text-center"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-red-600 mb-8">
          The Story
        </h2>
        
        <p className="text-gray-300 text-base sm:text-lg lg:text-xl leading-8 sm:leading-10 whitespace-pre-line">          
  THE GATE HAS OPENED...

A hidden portal has appeared between our world and the Upside Down.

Your mission is simple—complete dangerous missions, earn XP, unlock secrets, collect rare artifacts, and rise through the ranks.

Every completed mission strengthens your connection to the portal, but only the strongest explorers survive long enough to uncover every secret.
        </p>
      </motion.div>
    </section>
  );
}

export default Story;