import { Button } from "@/components/ui/button";
import { RotateCcw, Send, Trophy } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useGetTopScores, useSubmitCircleScore } from "../hooks/useQueries";

function calculateCircleScore(points: { x: number; y: number }[]): number {
  if (points.length < 20) return 0;
  const cx = points.reduce((s, p) => s + p.x, 0) / points.length;
  const cy = points.reduce((s, p) => s + p.y, 0) / points.length;
  const radii = points.map((p) => Math.sqrt((p.x - cx) ** 2 + (p.y - cy) ** 2));
  const avgRadius = radii.reduce((s, r) => s + r, 0) / radii.length;
  if (avgRadius < 10) return 0;
  const variance =
    radii.reduce((s, r) => s + (r - avgRadius) ** 2, 0) / radii.length;
  const stdDev = Math.sqrt(variance);
  const circularity = 1 - stdDev / avgRadius;
  const firstPt = points[0];
  const lastPt = points[points.length - 1];
  const closureDistance = Math.sqrt(
    (firstPt.x - lastPt.x) ** 2 + (firstPt.y - lastPt.y) ** 2,
  );
  const closurePenalty = Math.min(closureDistance / (avgRadius * 2), 1);
  const closureScore = 1 - closurePenalty * 0.4;
  const rawScore = circularity * closureScore;
  return Math.max(0, Math.min(100, Math.round(rawScore * 100)));
}

function ScoreDisplay({ score }: { score: number }) {
  const color =
    score >= 90
      ? "#f0c040"
      : score >= 70
        ? "#60c0a0"
        : score >= 50
          ? "#6090e0"
          : "#e06060";
  const label =
    score >= 95
      ? "Flawless!"
      : score >= 85
        ? "Excellent!"
        : score >= 70
          ? "Great Shape!"
          : score >= 50
            ? "Not Bad!"
            : "Keep Trying!";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="flex flex-col items-center gap-2"
    >
      <div className="text-7xl font-display font-bold" style={{ color }}>
        {score}%
      </div>
      <div className="text-lg font-medium" style={{ color }}>
        {label}
      </div>
    </motion.div>
  );
}

export default function CircleGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [hasDrawn, setHasDrawn] = useState(false);
  const submitMutation = useSubmitCircleScore();
  const { data: topScores, refetch: refetchScores } = useGetTopScores(10);

  const getPos = (
    e: React.MouseEvent | React.TouchEvent,
    canvas: HTMLCanvasElement,
  ) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ("touches" in e) {
      const t = e.touches[0];
      return {
        x: (t.clientX - rect.left) * scaleX,
        y: (t.clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const drawStroke = useCallback((pts: { x: number; y: number }[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (pts.length < 2) return;
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) {
      ctx.lineTo(pts[i].x, pts[i].y);
    }
    ctx.strokeStyle = "rgba(240, 192, 64, 0.9)";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  }, []);

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const pos = getPos(e, canvas);
    setIsDrawing(true);
    setPoints([pos]);
    setScore(null);
    setHasDrawn(false);
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const pos = getPos(e, canvas);
    setPoints((prev) => {
      const next = [...prev, pos];
      drawStroke(next);
      return next;
    });
  };

  const handleEnd = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing) return;
    setIsDrawing(false);
    setHasDrawn(true);
    if (points.length > 10) {
      const s = calculateCircleScore(points);
      setScore(s);
    }
  };

  const handleReset = () => {
    setScore(null);
    setPoints([]);
    setHasDrawn(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSubmit = async () => {
    if (score === null) return;
    try {
      await submitMutation.mutateAsync(score);
      toast.success(`Score of ${score}% submitted!`);
      refetchScores();
    } catch {
      toast.error("Failed to submit score.");
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || hasDrawn || isDrawing) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const r = Math.min(canvas.width, canvas.height) * 0.35;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 12]);
    ctx.stroke();
    ctx.setLineDash([]);
  }, [hasDrawn, isDrawing]);

  const formatDate = (ts: bigint) => {
    return new Date(Number(ts / BigInt(1_000_000))).toLocaleDateString();
  };

  return (
    <section id="game" className="py-32 px-6 relative">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.75 0.12 75), transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
            Interactive Challenge
          </span>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-5">
            Draw a{" "}
            <span className="text-gradient-gold italic">Perfect Circle</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Test your precision. Draw a circle freehand and see how close you
            are to perfection.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 items-start justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-6"
          >
            <p className="text-sm text-muted-foreground">
              Click and drag to draw your circle, then release to score.
            </p>

            <div className="relative">
              <div
                className="absolute -inset-1 rounded-3xl opacity-30"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.75 0.12 75), transparent)",
                }}
              />
              <canvas
                ref={canvasRef}
                data-ocid="game.canvas_target"
                width={540}
                height={540}
                className="canvas-drawing rounded-2xl block touch-none"
                style={{
                  background: "oklch(0.09 0.005 270)",
                  maxWidth: "100%",
                  width: "540px",
                  height: "540px",
                }}
                onMouseDown={handleStart}
                onMouseMove={handleMove}
                onMouseUp={handleEnd}
                onMouseLeave={handleEnd}
                onTouchStart={handleStart}
                onTouchMove={handleMove}
                onTouchEnd={handleEnd}
              />
            </div>

            <AnimatePresence mode="wait">
              {score !== null && (
                <motion.div
                  key="score"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <ScoreDisplay score={score} />
                </motion.div>
              )}
              {!hasDrawn && score === null && (
                <motion.p
                  key="hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-muted-foreground text-sm"
                >
                  Draw your circle above ↑
                </motion.p>
              )}
            </AnimatePresence>

            <div className="flex gap-3">
              <Button
                data-ocid="game.try_again.button"
                variant="outline"
                onClick={handleReset}
                className="border-white/10 hover:border-white/20 gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Try Again
              </Button>
              {score !== null && (
                <Button
                  data-ocid="game.submit_button"
                  onClick={handleSubmit}
                  disabled={submitMutation.isPending}
                  className="bg-gold-400 hover:bg-gold-300 text-background font-semibold gap-2"
                >
                  <Send className="w-4 h-4" />
                  {submitMutation.isPending ? "Submitting..." : "Submit Score"}
                </Button>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-80"
          >
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <Trophy className="w-5 h-5 text-gold-400" />
                <h3 className="font-display font-bold text-xl text-foreground">
                  Leaderboard
                </h3>
              </div>

              <div data-ocid="game.leaderboard.list" className="space-y-2">
                {(!topScores || topScores.length === 0) && (
                  <p className="text-muted-foreground text-sm text-center py-8">
                    No scores yet. Be the first!
                  </p>
                )}
                {topScores?.map((entry, i) => {
                  const ocid = `game.leaderboard.item.${i + 1}`;
                  const pct = Number(entry.percentage);
                  const medalColor =
                    i === 0
                      ? "text-gold-400"
                      : i === 1
                        ? "text-slate-300"
                        : i === 2
                          ? "text-amber-700"
                          : "text-muted-foreground";
                  return (
                    <div
                      key={`${String(entry.timestamp)}-${String(entry.percentage)}`}
                      data-ocid={ocid}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                    >
                      <span
                        className={`w-6 text-center font-bold text-sm ${medalColor}`}
                      >
                        {i === 0
                          ? "🥇"
                          : i === 1
                            ? "🥈"
                            : i === 2
                              ? "🥉"
                              : `${i + 1}.`}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-sm text-foreground">
                            {pct}%
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(entry.timestamp)}
                          </span>
                        </div>
                        <div className="mt-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            className="h-full rounded-full"
                            style={{
                              background:
                                "linear-gradient(90deg, oklch(0.75 0.12 75), oklch(0.85 0.14 80))",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
