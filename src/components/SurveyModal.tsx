import { useState, useEffect } from "react";
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
  "figuring out what to eat",
  "ideas on how to combine your meals",
  "pantry management",
  "get ideas for your shopping list",
  "staying consistent with friends",
];

const inputClass = (hasError: boolean) =>
  `w-full px-4 py-3 rounded-lg border bg-white ${
    hasError ? "border-error" : "border-outline-variant"
  } focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body-md`;

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
    anythingElse: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.healthGoal) {
      newErrors.healthGoal = "Please select a health goal";
    }

    if (formData.selectedFactors.length === 0) {
      newErrors.selectedFactors = "Please select at least one factor";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

  if (!GOOGLE_SCRIPT_URL) {
    throw new Error("VITE_GOOGLE_SCRIPT_URL environment variable is required");
  }

  const handleFactorToggle = (factor: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedFactors: prev.selectedFactors.includes(factor)
        ? prev.selectedFactors.filter((f) => f !== factor)
        : [...prev.selectedFactors, factor],
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-on-surface/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {!isSubmitted && (
          <>
            <div className="flex justify-between items-center mb-6 flex-shrink-0">
              <h2 className="font-headline-md text-headline-md text-on-surface">
                Take a simple survey to join
              </h2>
              <button
                onClick={onClose}
                className="text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-container p-1"
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
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <p className="text-on-surface-variant mb-6 font-body-md flex-shrink-0">
              Answer a few quick questions and get your community invite link.
            </p>
          </>
        )}

        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-6">
            <div className="text-center">
              <h3 className="font-headline-md text-headline-md text-on-surface mb-2">
                Thank you for taking the survey!
              </h3>
              <p className="text-on-surface-variant mb-6 font-body-md">
                Your response has been recorded. Join our Telegram community to
                get started!
              </p>
            </div>
            <a
              href={telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-on-primary font-label-bold px-8 py-4 rounded-lg hover:opacity-90 active:scale-95 transition-all text-lg"
            >
              Join the Telegram community
            </a>
            <button
              onClick={onClose}
              className="text-on-surface-variant hover:text-primary font-body-md underline"
            >
              Close
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 flex-1 overflow-y-auto pr-2"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-label-bold text-on-surface mb-2 uppercase tracking-wide"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errors.name) setErrors({ ...errors, name: "" });
                }}
                className={inputClass(!!errors.name)}
                placeholder="Your name"
                required
              />
              {errors.name && (
                <p className="text-error text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-label-bold text-on-surface mb-2 uppercase tracking-wide"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: "" });
                }}
                className={inputClass(!!errors.email)}
                placeholder="your@email.com"
                required
              />
              {errors.email && (
                <p className="text-error text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="healthGoal"
                className="block text-sm font-label-bold text-on-surface mb-2 uppercase tracking-wide"
              >
                What is your health goal?
              </label>
              <select
                id="healthGoal"
                value={formData.healthGoal}
                onChange={(e) => {
                  setFormData({ ...formData, healthGoal: e.target.value });
                  if (errors.healthGoal)
                    setErrors({ ...errors, healthGoal: "" });
                }}
                className={inputClass(!!errors.healthGoal)}
                required
              >
                <option value="">Select a goal...</option>
                {healthGoals.map((goal) => (
                  <option key={goal} value={goal}>
                    {goal}
                  </option>
                ))}
              </select>
              {errors.healthGoal && (
                <p className="text-error text-sm mt-1">{errors.healthGoal}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-label-bold text-on-surface mb-3 uppercase tracking-wide">
                What do you think matters to help you reach your goals?
              </label>
              <p className="text-xs text-on-surface-variant mb-3 italic">
                Select as many as apply.
              </p>
              <div className="space-y-2">
                {goalFactors.map((factor) => (
                  <label
                    key={factor}
                    className="flex items-center gap-3 p-3 rounded-lg border border-outline-variant/40 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.selectedFactors.includes(factor)}
                      onChange={() => {
                        handleFactorToggle(factor);
                        if (errors.selectedFactors) {
                          setErrors({ ...errors, selectedFactors: "" });
                        }
                      }}
                      className="w-5 h-5 rounded border border-outline-variant text-primary focus:ring-2 focus:ring-primary/30 cursor-pointer"
                    />
                    <span className="font-body-md text-on-surface capitalize">
                      {factor}
                    </span>
                  </label>
                ))}
              </div>
              {errors.selectedFactors && (
                <p className="text-error text-sm mt-2">
                  {errors.selectedFactors}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="anythingElse"
                className="block text-sm font-label-bold text-on-surface mb-2 uppercase tracking-wide"
              >
                Anything else?
              </label>
              <input
                type="text"
                id="anythingElse"
                value={formData.anythingElse}
                onChange={(e) =>
                  setFormData({ ...formData, anythingElse: e.target.value })
                }
                className={inputClass(false)}
                placeholder="Add anything else..."
              />
            </div>

            <div className="flex gap-3 pt-4 flex-shrink-0 sticky bottom-0 bg-white pb-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 rounded-lg border border-outline-variant bg-white text-on-surface font-label-bold hover:bg-surface-container transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  !formData.name.trim() ||
                  !formData.email.trim() ||
                  !formData.healthGoal ||
                  formData.selectedFactors.length === 0
                }
                className="flex-1 bg-primary text-on-primary font-label-bold px-4 py-3 rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit & Join"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
