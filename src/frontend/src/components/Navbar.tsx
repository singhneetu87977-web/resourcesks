import { motion } from "motion/react";

interface NavbarProps {
  onPlayGame?: () => void;
  onOpenQuiz?: () => void;
}

export default function Navbar({ onPlayGame, onOpenQuiz }: NavbarProps) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/assets/generated/study-logo-transparent.dim_300x100.png"
            alt="StudySpace Logo"
            className="h-10 w-auto object-contain"
          />
        </div>

        <nav className="glass-card rounded-full px-2 py-2 flex items-center gap-1">
          <button
            type="button"
            data-ocid="nav.home.link"
            onClick={() => scrollTo("hero")}
            className="px-4 py-1.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
          >
            Home
          </button>
          <button
            type="button"
            data-ocid="nav.resources.link"
            onClick={() => scrollTo("resources")}
            className="px-4 py-1.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
          >
            Resources
          </button>
          <button
            type="button"
            data-ocid="nav.author.link"
            onClick={() => scrollTo("author")}
            className="px-4 py-1.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
          >
            About
          </button>
          <button
            type="button"
            data-ocid="nav.quiz.button"
            onClick={onOpenQuiz}
            className="px-4 py-1.5 rounded-full text-sm font-medium text-background bg-gradient-to-r from-[oklch(0.72_0.25_310)] to-[oklch(0.75_0.22_200)] hover:opacity-90 transition-all"
          >
            📝 Quiz
          </button>
          <button
            type="button"
            data-ocid="nav.game.link"
            onClick={onPlayGame}
            className="px-4 py-1.5 rounded-full text-sm font-medium text-background bg-gradient-vibes hover:opacity-90 transition-all"
          >
            🎮 Game
          </button>
        </nav>
      </div>
    </motion.header>
  );
}
