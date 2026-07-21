import { motion } from "framer-motion";

const features = [
  {
    icon: "🎯",
    title: "Mission System",
    description:
      "Create, edit, complete, and manage missions while progressing deeper into the mysterious Upside Down.",
  },
  {
    icon: "⚡",
    title: "Level Up",
    description:
      "Earn XP by completing missions, increase your level, and unlock powerful rewards as you grow stronger.",
  },
  {
    icon: "🎒",
    title: "Inventory",
    description:
      "Collect rare artifacts, legendary items, and mysterious portal objects inside your personal inventory.",
  },
  {
    icon: "🏆",
    title: "Achievements",
    description:
      "Unlock unique achievements by completing milestones and proving yourself as the ultimate explorer.",
  },
  {
    icon: "🔊",
    title: "Immersive Experience",
    description:
      "Enjoy cinematic background music, interactive sound effects, smooth animations, and an authentic Stranger Things atmosphere.",
  },
  {
    icon: "🔒",
    title: "Secure Portal",
    description:
      "Protected authentication, encrypted passwords, profile management, and secure settings keep your portal safe.",
  },
];

function Features() {
  return (
    <section
  id="features"
  className="min-h-screen bg-black text-white py-16 sm:py-24 px-5 sm:px-8"
>
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center text-3xl sm:text-4xl lg:text-5xl font-black text-red-600 mb-12 sm:mb-16"
        >
          PORTAL FEATURES
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(220,38,38,0.5)",
              }}
              className="bg-[#111] border border-red-900 rounded-2xl p-6 sm:p-8 cursor-pointe"
            >
              <div className="text-5xl sm:text-6xl mb-6">{feature.icon}</div>

              <h3 className="text-2xl sm:text-3xl font-bold text-red-500 mb-4">
                {feature.title}
              </h3>

              <p className="text-sm sm:text-base text-gray-400 leading-6 sm:length-7">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;