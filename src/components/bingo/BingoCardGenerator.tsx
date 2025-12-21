import { useRef, useState } from "react";
import html2canvas from "html2canvas";

interface BingoCardGeneratorProps {
  checkedItems: Set<number>;
  photo: string | null;
  onReset: () => void;
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

const UNHEALTHY_HABITS_MINUS_3 = new Set([12, 22]); // Ate junk food, Felt stressed
const UNHEALTHY_HABITS_MINUS_5 = new Set([13, 19]); // Late-night meals, Drank a lot of alcohol
const BONUS_HABITS = new Set([7, 8, 26, 30, 31, 32, 33]); // Ran a marathon, Took stairs, Tracked calories, 100kg+ benchpress, Squats or waist work, New fitness friend, Fitness app sub

const UNHEALTHY_HABITS = new Set([
  ...UNHEALTHY_HABITS_MINUS_3,
  ...UNHEALTHY_HABITS_MINUS_5,
]);
const HEALTHY_HABITS_COUNT =
  BINGO_QUESTIONS.length - UNHEALTHY_HABITS.size - BONUS_HABITS.size;

const SCORE_MESSAGES: { range: [number, number]; message: string }[] = [
  { range: [0, 5], message: "Room for Growth" },
  { range: [6, 10], message: "You Got Started" },
  { range: [11, 15], message: "You Took First Steps" },
  { range: [16, 20], message: "You Built Foundation" },
  { range: [21, 25], message: "You Made Progress" },
  { range: [26, 30], message: "You Built Momentum" },
  { range: [31, 35], message: "You Were on Track" },
  { range: [36, 40], message: "You Stayed Focused" },
  { range: [41, 45], message: "You Were Committed" },
  { range: [46, 50], message: "You Were Consistent" },
  { range: [51, 55], message: "You Were Dedicated" },
  { range: [56, 60], message: "You Were Disciplined" },
  { range: [61, 65], message: "You Were Persistent" },
  { range: [66, 70], message: "You Were Resilient" },
  { range: [71, 75], message: "You Were Strong" },
  { range: [76, 80], message: "You Were Determined" },
  { range: [81, 85], message: "You Were a Health Warrior" },
  { range: [86, 90], message: "You Were a Health Champion" },
  { range: [91, 95], message: "You Were Exceptional" },
  { range: [96, 100], message: "You Were a Wellness Outlier" },
];

function calculateScore(checkedItems: Set<number>): {
  score: number;
  message: string;
} {
  let healthyChecked = 0;
  let unhealthyPenaltyMinus3 = 0;
  let unhealthyPenaltyMinus5 = 0;
  let bonusPoints = 0;

  checkedItems.forEach((index) => {
    if (UNHEALTHY_HABITS_MINUS_3.has(index)) {
      unhealthyPenaltyMinus3++;
    } else if (UNHEALTHY_HABITS_MINUS_5.has(index)) {
      unhealthyPenaltyMinus5++;
    } else if (BONUS_HABITS.has(index)) {
      bonusPoints++;
    } else {
      healthyChecked++;
    }
  });

  const healthyScore = (healthyChecked / HEALTHY_HABITS_COUNT) * 100;
  const unhealthyPenalty =
    unhealthyPenaltyMinus3 * 3 + unhealthyPenaltyMinus5 * 5;
  const bonusScore = bonusPoints * 2;
  const totalScore = healthyScore - unhealthyPenalty + bonusScore;

  const finalScore = Math.max(0, Math.min(100, Math.round(totalScore)));

  const messageObj = SCORE_MESSAGES.find(
    ({ range }) => finalScore >= range[0] && finalScore <= range[1]
  );

  return {
    score: finalScore,
    message: messageObj?.message || "You're Building Momentum",
  };
}

export default function BingoCardGenerator({
  checkedItems,
  photo,
  onReset,
}: BingoCardGeneratorProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { score, message } = calculateScore(checkedItems);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    setIsGenerating(true);
    try {
      const originalWidth = cardRef.current.style.width;
      const originalMaxWidth = cardRef.current.style.maxWidth;

      const rect = cardRef.current.getBoundingClientRect();
      const cardWidth = rect.width;
      const cardHeight = rect.height;

      cardRef.current.style.width = `${cardWidth}px`;
      cardRef.current.style.maxWidth = `${cardWidth}px`;
      cardRef.current.style.boxSizing = "border-box";

      const scale = 1080 / cardWidth;

      const bgImage = new Image();
      bgImage.crossOrigin = "anonymous";
      bgImage.src = "/images/young-woman-training-gym.jpg";

      await new Promise((resolve) => {
        if (bgImage.complete) {
          setTimeout(resolve, 200);
        } else {
          bgImage.onload = () => setTimeout(resolve, 200);
          bgImage.onerror = () => setTimeout(resolve, 200);
        }
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      const canvas = await html2canvas(cardRef.current, {
        width: cardWidth,
        height: cardHeight,
        scale: scale * 2,
        backgroundColor: null,
        useCORS: true,
        logging: false,
        allowTaint: false,
        foreignObjectRendering: false,
        imageTimeout: 15000,
        onclone: (_clonedDoc, element) => {
          const clonedCard = element as HTMLElement;
          if (clonedCard) {
            clonedCard.style.position = "relative";
            clonedCard.style.transform = "none";
            clonedCard.style.left = "0";
            clonedCard.style.top = "0";
            clonedCard.style.margin = "0";
            clonedCard.style.padding = "16px";
            const overlay = clonedCard.querySelector(
              ".absolute.inset-0"
            ) as HTMLElement;
            if (overlay) {
              overlay.style.position = "absolute";
              overlay.style.top = "0";
              overlay.style.left = "0";
              overlay.style.right = "0";
              overlay.style.bottom = "0";
            }
          }
        },
      });

      cardRef.current.style.width = originalWidth;
      cardRef.current.style.maxWidth = originalMaxWidth;

      const link = document.createElement("a");
      link.download = `my-2025-health-bingo-${score}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch {
      // Error generating image
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="min-h-screen py-6 sm:py-12 px-3 sm:px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Your 2025 Health Bingo Card
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className="bg-kulagreen text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-sm shadow-brutal active:shadow-brutal-sm active:translate-x-1 active:translate-y-1 transition-all duration-150 text-base sm:text-lg border-4 border-black disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation w-full sm:w-auto"
            >
              {isGenerating ? "Generating..." : "Download My Bingo Card"}
            </button>
            <button
              onClick={onReset}
              className="bg-gray-200 text-gray-900 font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-sm shadow-brutal active:shadow-brutal-sm active:translate-x-1 active:translate-y-1 transition-all duration-150 text-base sm:text-lg border-4 border-black touch-manipulation w-full sm:w-auto"
            >
              Start Over
            </button>
          </div>
        </div>

        <div className="flex justify-center pb-4 px-4">
          <div
            ref={cardRef}
            className="relative border-4 border-black shadow-brutal-lg p-4 max-w-sm"
            style={{
              width: "384px",
              position: "relative",
              backgroundImage: "url('/images/young-woman-training-gym.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "scroll",
            }}
          >
            <div
              className="absolute inset-0 bg-black/90"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1,
              }}
            ></div>
            <div
              className="relative z-10"
              style={{ position: "relative", zIndex: 2 }}
            >
              <div className="flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h1 className="text-lg font-extrabold text-white">
                    My 2025 Health Bingo
                  </h1>
                  <img
                    src="/kulawise-logo.png"
                    alt="Kulawise"
                    className="h-6 w-auto"
                  />
                </div>

                <div className="flex items-center gap-3 mb-5">
                  {photo && (
                    <div className="w-16 h-16 border-2 border-white rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={photo}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-xs font-extrabold text-white mb-0.5">
                      {message}
                    </p>
                    <p className="text-lg font-extrabold text-kulayellow">
                      Score: {score}/100
                    </p>
                  </div>
                </div>

                <div className="border-t-2 border-white pt-2 mb-2"></div>

                <ul className="grid grid-cols-2 gap-x-2 gap-y-0.5 mb-2 list-none p-0 m-0">
                  {BINGO_QUESTIONS.map((question, index) => {
                    const isChecked = checkedItems.has(index);
                    return (
                      <li
                        key={index}
                        className="text-[10px] text-white"
                        style={{
                          listStyle: "none",
                          lineHeight: "14px",
                          display: "block",
                        }}
                      >
                        <span
                          className="leading-tight break-words"
                          style={{
                            display: "block",
                            lineHeight: "14px",
                            textDecoration: isChecked ? "underline" : "none",
                            textDecorationColor: isChecked
                              ? "#10b981"
                              : "transparent",
                            textDecorationThickness: isChecked ? "2px" : "0",
                          }}
                        >
                          {question}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <div className="text-center border-t-2 border-white pt-2 mt-5">
                  <div className="mb-1.5">
                    <p className="text-xs font-bold text-white mb-0.5">
                      Check yours at:
                    </p>
                    <p className="text-xs text-kulayellow font-bold">
                      https://community.kulawise.com
                    </p>
                  </div>
                  {/* <p className="text-xs text-white/80">Powered by Kulawise</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
