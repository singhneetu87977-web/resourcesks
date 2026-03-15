import { BookOpen, Coffee, Users, Zap } from "lucide-react";
import { motion } from "motion/react";

const stats = [
  {
    icon: BookOpen,
    value: "200+",
    label: "Resources Curated",
    color: "text-purple-400",
  },
  {
    icon: Users,
    value: "10k+",
    label: "Students Helped",
    color: "text-pink-400",
  },
  { icon: Coffee, value: "∞", label: "Cups of Coffee", color: "text-cyan-400" },
  {
    icon: Zap,
    value: "100%",
    label: "Good Vibes Only",
    color: "text-lime-400",
  },
];

export default function AuthorSection() {
  return (
    <section id="author" className="py-24 px-6 relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.65 0.25 300), oklch(0.65 0.25 340))",
        }}
      />

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-sm font-semibold text-purple-400 uppercase tracking-widest mb-3">
            ✌️ The Person Behind This
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Meet <span className="text-gradient-vibes">Josh Mecheil</span>
          </h2>
        </motion.div>

        <motion.div
          data-ocid="author.card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative rounded-3xl p-0.5 overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.65 0.25 300), oklch(0.65 0.25 340), oklch(0.75 0.15 200))",
          }}
        >
          <div
            className="rounded-3xl p-8 md:p-12"
            style={{ background: "oklch(0.13 0.015 285)" }}
          >
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* Avatar - static, no looping animation */}
              <div className="flex-shrink-0">
                <div
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full p-0.5 overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.65 0.25 300), oklch(0.65 0.25 340))",
                  }}
                >
                  <img
                    src="/assets/generated/author-kushagra-transparent.dim_200x200.png"
                    alt="Josh Mecheil"
                    className="w-full h-full rounded-full object-cover"
                    style={{ background: "oklch(0.16 0.012 285)" }}
                  />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-2 mb-2">
                  <h3 className="font-display text-3xl font-bold text-foreground">
                    Josh Mecheil
                  </h3>
                  <span className="text-2xl">👋</span>
                </div>
                <p className="text-sm font-semibold text-purple-400 mb-4">
                  Study Content Creator & Resource Curator
                </p>
                <p className="text-muted-foreground leading-relaxed text-base mb-6">
                  Hey! I'm Josh Mecheil 👋 Just a student who loves finding the
                  best study resources so you don't have to. No boring
                  textbooks, just the good stuff fr fr.
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {[
                    "📚 Study Nerd",
                    "☕ Coffee Addict",
                    "🎮 Gamer",
                    "🚀 Always Learning",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-3 py-1.5 rounded-full glass-card text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-border">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-2`} />
                  <div
                    className={`font-display text-2xl font-bold ${stat.color}`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
