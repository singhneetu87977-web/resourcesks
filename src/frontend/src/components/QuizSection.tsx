import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const questions = [
  {
    question: "What are resources that can be replenished naturally? 🌱",
    options: [
      "Fossil fuels",
      "Renewable resources",
      "Coal",
      "Nuclear materials",
    ],
    correct: 1,
  },
  {
    question: "Which of these is a non-renewable resource? ⛏️",
    options: ["Solar energy", "Wind power", "Coal", "Hydropower"],
    correct: 2,
  },
  {
    question: "What are the three pillars of sustainability? 🏛️",
    options: [
      "Water, Air, Land",
      "Economic, Social, Environmental",
      "Food, Shelter, Clothing",
      "Sun, Wind, Water",
    ],
    correct: 1,
  },
  {
    question: "What does sustainable development balance? ⚖️",
    options: [
      "Profit and loss only",
      "Population and resources",
      "Economic growth, social equity, environmental protection",
      "Technology and tradition",
    ],
    correct: 2,
  },
  {
    question: "Which activity helps in water conservation? 💧",
    options: [
      "Leaving taps running",
      "Industrial dumping",
      "Rainwater harvesting",
      "Excessive irrigation",
    ],
    correct: 2,
  },
  {
    question: "What does deforestation primarily cause? 🌳",
    options: [
      "More rainfall",
      "Loss of biodiversity and increased CO₂",
      "Better soil quality",
      "Cooler temperatures",
    ],
    correct: 1,
  },
  {
    question: "How many UN Sustainable Development Goals are there? 🌍",
    options: ["10", "20", "17", "25"],
    correct: 2,
  },
  {
    question: "Which resource type includes human skills and labor? 🧠",
    options: [
      "Natural resources",
      "Capital resources",
      "Human resources",
      "Mineral resources",
    ],
    correct: 2,
  },
  {
    question: "What is soil conservation? 🌾",
    options: [
      "Adding chemicals to soil",
      "Protecting soil from erosion and degradation",
      "Removing topsoil for construction",
      "Burning crop residue",
    ],
    correct: 1,
  },
  {
    question: "Which energy source is renewable? ☀️",
    options: ["Natural gas", "Coal", "Petroleum", "Solar energy"],
    correct: 3,
  },
];

function getScoreMessage(score: number): { emoji: string; message: string } {
  if (score === 10)
    return {
      emoji: "🔥",
      message: "Absolute legend! No cap, you ate that quiz up!",
    };
  if (score >= 8)
    return {
      emoji: "✨",
      message: "Main character energy! You really know your stuff fr fr!",
    };
  if (score >= 6)
    return {
      emoji: "💜",
      message: "Slay! Decent vibes — keep grinding bestie!",
    };
  if (score >= 4)
    return {
      emoji: "📚",
      message: "Mid but make it fashion — go back and study the notes!",
    };
  return {
    emoji: "😭",
    message:
      "Bruh it's giving... not great. Time to hit those study resources!",
  };
}

export default function QuizSection() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[currentQ];

  function handleSelect(idx: number) {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === q.correct) setScore((s) => s + 1);
  }

  function handleNext() {
    if (currentQ + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrentQ((c) => c + 1);
      setSelected(null);
    }
  }

  function handleRestart() {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  const { emoji, message } = getScoreMessage(score);

  return (
    <section
      data-ocid="quiz.section"
      className="py-24 px-4 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: "oklch(0.65 0.25 300)" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: "oklch(0.65 0.25 340)" }}
        />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold mb-4">
            🧠 Knowledge Check
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient-vibes mb-3">
            Resources Quiz
          </h2>
          <p className="text-muted-foreground text-lg">
            Test your knowledge — no pressure tho 👀
          </p>
        </motion.div>

        {/* Quiz Card */}
        <AnimatePresence mode="wait">
          {!finished ? (
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
              className="glass-card rounded-2xl p-8"
            >
              {/* Progress */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-muted-foreground font-medium">
                  Question {currentQ + 1} of {questions.length}
                </span>
                <span className="text-sm font-bold text-primary">
                  Score: {score}
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-muted mb-8 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-vibes"
                  animate={{
                    width: `${((currentQ + (selected !== null ? 1 : 0)) / questions.length) * 100}%`,
                  }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              {/* Question */}
              <h3 className="text-xl font-bold text-foreground mb-8 leading-relaxed">
                {q.question}
              </h3>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {q.options.map((opt, idx) => {
                  let classes =
                    "w-full text-left px-5 py-4 rounded-xl border font-medium transition-all duration-200 ";

                  if (selected === null) {
                    classes +=
                      "border-border bg-card text-foreground hover:border-primary hover:bg-primary/10 cursor-pointer";
                  } else if (idx === q.correct) {
                    classes +=
                      "border-green-500 bg-green-500/15 text-green-300";
                  } else if (idx === selected) {
                    classes += "border-red-500 bg-red-500/15 text-red-300";
                  } else {
                    classes +=
                      "border-border bg-card text-muted-foreground opacity-50";
                  }

                  const markerIdx = idx + 1;
                  const dataOcid = `quiz.option.button.${markerIdx}` as const;

                  return (
                    <motion.button
                      key={opt}
                      data-ocid={dataOcid}
                      className={classes}
                      onClick={() => handleSelect(idx)}
                      disabled={selected !== null}
                      whileHover={selected === null ? { scale: 1.01 } : {}}
                      whileTap={selected === null ? { scale: 0.99 } : {}}
                    >
                      <span className="font-bold text-primary/70 mr-3">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      {opt}
                      {selected !== null && idx === q.correct && " ✓"}
                      {selected !== null &&
                        idx === selected &&
                        idx !== q.correct &&
                        " ✗"}
                    </motion.button>
                  );
                })}
              </div>

              {/* Feedback + Next */}
              <AnimatePresence>
                {selected !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-between"
                  >
                    <p className="text-sm font-medium">
                      {selected === q.correct ? (
                        <span className="text-green-400">
                          🎉 Correct! Slay!
                        </span>
                      ) : (
                        <span className="text-red-400">
                          💀 Nope — correct was: {q.options[q.correct]}
                        </span>
                      )}
                    </p>
                    <motion.button
                      data-ocid="quiz.next.button"
                      onClick={handleNext}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      className="px-6 py-2.5 rounded-xl font-bold text-sm bg-gradient-vibes text-white shadow-lg"
                    >
                      {currentQ + 1 >= questions.length
                        ? "See Results 🏆"
                        : "Next →"}
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="glass-card rounded-2xl p-10 text-center"
            >
              <div className="text-7xl mb-6">{emoji}</div>
              <h3 className="font-display text-4xl font-bold text-gradient-vibes mb-2">
                {score} / {questions.length}
              </h3>
              <p className="text-lg text-muted-foreground mb-3">
                Quiz Complete!
              </p>
              <p className="text-foreground font-semibold text-base mb-8">
                {message}
              </p>

              {/* Score bar */}
              <div className="w-full h-3 rounded-full bg-muted mx-auto max-w-xs mb-8 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-vibes"
                  initial={{ width: 0 }}
                  animate={{ width: `${(score / questions.length) * 100}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </div>

              <motion.button
                data-ocid="quiz.restart.button"
                onClick={handleRestart}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="px-8 py-3 rounded-xl font-bold text-sm bg-gradient-vibes text-white shadow-lg"
              >
                🔄 Restart Quiz
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
