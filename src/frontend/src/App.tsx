import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import AuthorSection from "./components/AuthorSection";
import CircleGame from "./components/CircleGame";
import EducationSection from "./components/EducationSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import QuizSection from "./components/QuizSection";
import ResourcesSection from "./components/ResourcesSection";

export default function App() {
  const [gameOpen, setGameOpen] = useState(false);

  const handleOpenQuiz = () => {
    document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="grain min-h-screen bg-background">
      <Navbar
        onPlayGame={() => setGameOpen(true)}
        onOpenQuiz={handleOpenQuiz}
      />
      <main>
        <HeroSection />
        <EducationSection />
        <div id="quiz">
          <QuizSection />
        </div>
        <ResourcesSection />
        <AuthorSection />

        {/* Circle Game CTA */}
        <section className="py-16 flex flex-col items-center gap-6 text-center px-4">
          <div className="space-y-3">
            <h2
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[oklch(0.72_0.25_310)] via-[oklch(0.75_0.22_200)] to-[oklch(0.8_0.18_150)] bg-clip-text text-transparent"
              style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
            >
              Think You Can Draw a Perfect Circle? 🎯
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto text-base">
              Challenge yourself and compete on the leaderboard. One shot, one
              circle — how close to perfect can you get?
            </p>
          </div>
          <Button
            data-ocid="game.open_modal_button"
            onClick={() => setGameOpen(true)}
            className="relative text-lg font-bold px-10 py-6 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.65 0.28 310), oklch(0.6 0.25 250), oklch(0.7 0.22 200))",
              color: "white",
              border: "none",
            }}
          >
            🎮 Play Circle Game
          </Button>
        </section>
      </main>
      <Footer />

      {/* Circle Game Dialog */}
      <Dialog open={gameOpen} onOpenChange={setGameOpen}>
        <DialogContent
          data-ocid="game.dialog"
          className="max-w-5xl w-full max-h-[90vh] overflow-y-auto p-0"
          style={{
            background: "oklch(0.13 0.015 285)",
            border: "1px solid oklch(0.28 0.06 290)",
          }}
        >
          <DialogHeader className="px-6 pt-6 pb-2">
            <DialogTitle
              className="text-2xl font-bold bg-gradient-to-r from-[oklch(0.72_0.25_310)] to-[oklch(0.75_0.22_200)] bg-clip-text text-transparent"
              style={{ fontFamily: "Bricolage Grotesque, sans-serif" }}
            >
              🎮 Draw a Perfect Circle
            </DialogTitle>
          </DialogHeader>
          <div className="px-4 pb-6">
            <CircleGame />
          </div>
          <button
            type="button"
            data-ocid="game.close_button"
            className="sr-only"
            aria-label="Close game dialog"
            onClick={() => setGameOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Toaster
        theme="dark"
        toastOptions={{
          style: {
            background: "oklch(0.13 0.015 285)",
            border: "1px solid oklch(0.22 0.018 285)",
            color: "oklch(0.97 0.005 280)",
          },
        }}
      />
    </div>
  );
}
