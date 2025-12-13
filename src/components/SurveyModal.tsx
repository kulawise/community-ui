import { useState } from "react";
import type { FormEvent } from "react";

interface SurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
  telegramLink?: string;
}

const healthGoals = [
  "lose weight",
  "gain weight",
  "add more muscle",
  "just maintain fitness",
];

const goalFactors = [
  "portion control",
  "more gym checkins",
  "more cardio",
  "healthier diet",
  "fasting",
  "meal recommendations",
  "pantry management",
  "get ideas for your shopping list",
];

export default function SurveyModal({
  isOpen,
  onClose,
  telegramLink = "https://t.me/kulawise",
}: SurveyModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    healthGoal: "",
    selectedFactors: [] as string[],
    otherFactor: "",
    additionalThoughts: "",
  });

  const handleFactorToggle = (factor: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedFactors: prev.selectedFactors.includes(factor)
        ? prev.selectedFactors.filter((f) => f !== factor)
        : [...prev.selectedFactors, factor],
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    window.location.href = telegramLink;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white border-4 border-black shadow-brutal-lg max-w-2xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-hidden flex flex-col">
        <div className="absolute top-0 right-0 w-12 h-12 bg-kulayellow border-b-4 border-l-4 border-black"></div>

        <div className="flex justify-between items-center mb-6 flex-shrink-0">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
            Take a simple survey to join
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 transition-colors border-2 border-black hover:bg-kulayellow p-1 rounded-sm"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <p className="text-gray-700 mb-6 font-medium flex-shrink-0">
          Answer a few quick questions and get your community invite link.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 flex-1 overflow-y-auto pr-2"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 border-4 border-black focus:border-kulagreen focus:ring-4 focus:ring-kulayellow transition-all font-medium"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-3 border-4 border-black focus:border-kulagreen focus:ring-4 focus:ring-kulayellow transition-all font-medium"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="healthGoal"
              className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide"
            >
              What is your health goal?
            </label>
            <select
              id="healthGoal"
              value={formData.healthGoal}
              onChange={(e) =>
                setFormData({ ...formData, healthGoal: e.target.value })
              }
              className="w-full px-4 py-3 border-4 border-black focus:border-kulagreen focus:ring-4 focus:ring-kulayellow transition-all font-medium bg-white"
              required
            >
              <option value="">Select a goal...</option>
              {healthGoals.map((goal) => (
                <option key={goal} value={goal}>
                  {goal}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
              What do you think matters to help you reach your goals?
            </label>
            <p className="text-xs text-gray-600 mb-3 italic">
              Select as many as apply. You can also suggest more below.
            </p>
            <div className="space-y-2">
              {goalFactors.map((factor) => (
                <label
                  key={factor}
                  className="flex items-center gap-3 p-3 border-2 border-gray-300 hover:border-kulagreen hover:bg-kulagreen/5 transition-all cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.selectedFactors.includes(factor)}
                    onChange={() => handleFactorToggle(factor)}
                    className="w-5 h-5 border-2 border-black text-kulagreen focus:ring-2 focus:ring-kulayellow cursor-pointer"
                  />
                  <span className="font-medium text-gray-900 capitalize">
                    {factor}
                  </span>
                </label>
              ))}
            </div>
            <div className="mt-3">
              <label
                htmlFor="otherFactor"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Suggest more:
              </label>
              <input
                type="text"
                id="otherFactor"
                value={formData.otherFactor}
                onChange={(e) =>
                  setFormData({ ...formData, otherFactor: e.target.value })
                }
                className="w-full px-4 py-2 border-2 border-gray-300 border-dashed focus:border-kulagreen focus:ring-2 focus:ring-kulayellow transition-all font-medium"
                placeholder="Add your suggestion..."
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="additionalThoughts"
              className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide"
            >
              Anything else you think matters healthwise?
            </label>
            <textarea
              id="additionalThoughts"
              value={formData.additionalThoughts}
              onChange={(e) =>
                setFormData({ ...formData, additionalThoughts: e.target.value })
              }
              className="w-full px-4 py-3 border-4 border-black focus:border-kulagreen focus:ring-4 focus:ring-kulayellow transition-all font-medium resize-none"
              placeholder="Share your thoughts..."
              rows={4}
            />
          </div>

          <div className="flex gap-3 pt-4 flex-shrink-0 sticky bottom-0 bg-white pb-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border-4 border-black bg-white text-gray-900 font-bold hover:bg-gray-100 hover:translate-x-1 hover:translate-y-1 shadow-brutal-sm hover:shadow-none transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-kulagreen text-white font-bold px-4 py-3 border-4 border-black hover:bg-kulagreen-dark hover:translate-x-1 hover:translate-y-1 shadow-brutal-sm hover:shadow-none transition-all"
            >
              Submit & Join
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
