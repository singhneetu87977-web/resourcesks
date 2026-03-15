import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export default function HeroSection() {
  const scrollToResources = () => {
    document
      .getElementById("resources")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(/assets/generated/hero-resources-bg.dim_1600x900.jpg)",
        }}
      />
      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />

      {/* Vibrant glow orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-15 blur-3xl"
        style={{ background: "oklch(0.65 0.25 300)" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full opacity-15 blur-3xl"
        style={{ background: "oklch(0.65 0.25 340)" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full opacity-10 blur-3xl"
        style={{ background: "oklch(0.75 0.15 200)" }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-2 mb-8 text-sm text-purple-400"
        >
          <Sparkles className="w-3.5 h-3.5" />✨ Curated by students, for
          students
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="font-display text-6xl md:text-8xl font-bold leading-[1.05] mb-6 tracking-tight"
        >
          <span className="text-foreground">Level Up</span>
          <br />
          <span className="text-gradient-vibes">Your Studies</span>
          <br />
          <span className="text-foreground">🚀</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed"
        >
          No cap, these resources actually slap 💯
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="text-base text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Study smarter, not harder. All the tools, guides, and materials you
          actually need — fr fr.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            data-ocid="hero.primary_button"
            onClick={scrollToResources}
            size="lg"
            className="bg-gradient-vibes hover:opacity-90 text-white font-bold px-8 py-6 text-base rounded-full shadow-purple transition-all hover:-translate-y-0.5"
          >
            Explore Resources 🔥
            <ChevronDown className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator - static, no looping animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground text-xs"
      >
        <span className="tracking-widest uppercase">Scroll</span>
        <div>
          <ChevronDown className="w-4 h-4" />
        </div>
      </motion.div>
    </section>
  );
}
