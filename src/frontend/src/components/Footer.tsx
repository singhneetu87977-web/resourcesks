import { Heart } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const utm = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center">
          <img
            src="/assets/generated/study-logo-transparent.dim_300x100.png"
            alt="StudySpace Logo"
            className="h-8 w-auto object-contain"
          />
        </div>

        <p className="text-sm text-muted-foreground flex items-center gap-1.5">
          © {year}. Made with
          <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
          by Josh Mecheil using{" "}
          <a
            href={utm}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            caffeine.ai
          </a>
        </p>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <button
            type="button"
            onClick={() => scrollTo("hero")}
            className="hover:text-foreground transition-colors"
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => scrollTo("resources")}
            className="hover:text-foreground transition-colors"
          >
            Resources
          </button>
          <button
            type="button"
            onClick={() => scrollTo("author")}
            className="hover:text-foreground transition-colors"
          >
            About
          </button>
          <button
            type="button"
            onClick={() => scrollTo("game")}
            className="hover:text-foreground transition-colors"
          >
            Game
          </button>
        </div>
      </div>
    </footer>
  );
}
