import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BingoChecklistProps {
  onComplete: (checkedItems: Set<number>) => void;
  initialChecked?: Set<number>;
}

const BINGO_QUESTIONS = [
  "Weekly gym sessions",
  "Monthly gym visits",
  "Regular walks",
  "Hiking or trails",
  "Cycling",
  "Swimming",
  "Outdoor sports",
  "Ran a marathon",
  "Took stairs",
  "Portion control",
  "Fruits and vegetables",
  "Drank water",
  "Ate junk food",
  "Late-night meals",
  "Cooked at home",
  "Reduced sugary drinks",
  "Achieved weight goal",
  "Checked weight",
  "Food awareness",
  "Drank a lot of alcohol",
  "Rest days",
  "Prioritized sleep",
  "Felt stressed",
  "Health improvements",
  "Yoga or stretching",
  "Meditation practice",
  "Tracked calories",
  "Intermittent fasting",
  "Reduced alcohol",
  "Improved flexibility",
  "100kg+ benchpress",
  "Squats or waist work",
  "New fitness friend",
  "Fitness app sub",
  "Quit unhealthy habits",
];

export default function BingoChecklist({
  onComplete,
  initialChecked = new Set(),
}: BingoChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(initialChecked);
  const [currentIndex, setCurrentIndex] = useState(0);

  const toggleItem = (index: number) => {
    const newChecked = new Set(checkedItems);

    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedItems(newChecked);
  };

  const handleNext = () => {
    if (currentIndex < BINGO_QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleContinue = () => {
    if (checkedItems.size >= 5) {
      onComplete(checkedItems);
    }
  };

  const currentQuestion = BINGO_QUESTIONS[currentIndex];
  const isChecked = checkedItems.has(currentIndex);
  const progress = ((currentIndex + 1) / BINGO_QUESTIONS.length) * 100;

  return (
    <section className="min-h-screen py-6 sm:py-12 px-4 bg-white pt-20 sm:pt-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-4">
            Your 2025 Health Bingo
          </h2>
          <div className="inline-block bg-kulagreen text-white font-bold px-4 sm:px-6 py-2 sm:py-3 border-4 border-black shadow-brutal-sm text-sm sm:text-base mb-4 md:hidden">
            Checked: {checkedItems.size} / 35
          </div>
          <div className="text-sm text-gray-600 mb-2 md:hidden">
            Question {currentIndex + 1} of 35
          </div>
          <div className="w-full max-w-md mx-auto bg-gray-200 border-4 border-black h-4">
            <div
              className="bg-kulagreen h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-5 gap-4 mb-8">
          {BINGO_QUESTIONS.map((question, index) => {
            const isItemChecked = checkedItems.has(index);
            return (
              <button
                key={index}
                onClick={() => toggleItem(index)}
                className={`aspect-square border-4 border-black p-4 text-sm font-bold transition-all duration-150 ${
                  isItemChecked
                    ? "bg-kulagreen text-white shadow-brutal-sm"
                    : "bg-white text-gray-900 hover:bg-gray-50 shadow-brutal-sm"
                }`}
              >
                <div className="flex items-center justify-center h-full">
                  <span className="text-center leading-tight">{question}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="md:hidden mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => toggleItem(currentIndex)}
                className="w-full min-h-[300px] border-4 border-black p-6 shadow-brutal-lg touch-manipulation bg-white text-gray-900"
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="mb-4">
                    {isChecked ? (
                      <span className="w-12 h-12 rounded-full bg-kulagreen block"></span>
                    ) : (
                      <span className="text-4xl">○</span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-center leading-tight">
                    {currentQuestion}
                  </h3>
                </div>
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="md:hidden flex justify-between gap-4 mb-8">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="bg-gray-200 text-gray-900 font-bold px-6 py-3 rounded-sm shadow-brutal active:shadow-brutal-sm active:translate-x-1 active:translate-y-1 transition-all duration-150 text-base border-4 border-black touch-manipulation flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === BINGO_QUESTIONS.length - 1}
            className="bg-kulablue text-white font-bold px-6 py-3 rounded-sm shadow-brutal active:shadow-brutal-sm active:translate-x-1 active:translate-y-1 transition-all duration-150 text-base border-4 border-black touch-manipulation flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>

        <div className="text-center">
          <button
            onClick={handleContinue}
            disabled={checkedItems.size < 5}
            className="bg-kulapurple text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-sm shadow-brutal hover:shadow-brutal-sm active:translate-x-1 active:translate-y-1 transition-all duration-150 text-base sm:text-lg border-4 border-black w-full sm:w-auto touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Finish
          </button>
        </div>
      </div>
    </section>
  );
}
