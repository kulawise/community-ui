import { useState } from "react";
import type { FormEvent } from "react";

interface EmailCollectionProps {
  onEmailSubmitted: (email: string) => void;
}

export default function EmailCollection({
  onEmailSubmitted,
}: EmailCollectionProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (): boolean => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateEmail()) {
      return;
    }

    setIsSubmitting(true);

    const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

    if (!GOOGLE_SCRIPT_URL) {
      setError("Configuration error. Please try again later.");
      setIsSubmitting(false);
      return;
    }

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          gameSubmission: true,
        }),
      });

      onEmailSubmitted(email.trim());
    } catch {
      onEmailSubmitted(email.trim());
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-kulagreen/10 to-kulayellow/20 px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight">
          Your 2025 Health Bingo
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-8 sm:mb-12 max-w-xl mx-auto">
          Enter your email to get started
        </p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              placeholder="your.email@example.com"
              className={`w-full px-4 py-4 text-lg border-4 border-black shadow-brutal-sm focus:outline-none focus:ring-4 focus:ring-kulagreen/50 transition-all ${
                error ? "border-red-500" : ""
              }`}
              disabled={isSubmitting}
            />
            {error && (
              <p className="text-red-600 text-sm mt-2 text-left">{error}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-kulagreen text-white font-bold px-8 sm:px-12 py-4 sm:py-6 rounded-sm shadow-brutal active:shadow-brutal-sm active:translate-x-1 active:translate-y-1 transition-all duration-150 text-lg sm:text-xl border-4 border-black touch-manipulation w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Continue"}
          </button>
        </form>
      </div>
    </section>
  );
}
