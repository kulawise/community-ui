import { useState } from "react";
import type { FormEvent } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");

    const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
    if (!GOOGLE_SCRIPT_URL) {
      throw new Error("VITE_GOOGLE_SCRIPT_URL environment variable is required");
    }

    setIsSubmitting(true);
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameSubmission: true, email }),
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error("Error submitting email:", err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-surface-container-highest">
      <div className="max-w-container-max mx-auto px-gutter text-center space-y-8">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            Stay updated on our progress
          </h2>
          <p className="text-on-surface-variant font-body-lg">
            Get bi-weekly insights into habit science and community impact
            reports.
          </p>
        </div>

        {isSubmitted ? (
          <p className="font-label-bold text-primary">
            You're in. Thanks for subscribing!
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto flex flex-col sm:flex-row gap-3"
          >
            <input
              className="flex-1 px-6 py-4 rounded-lg bg-surface border border-outline focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="Enter your email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-on-primary px-8 py-4 rounded-lg font-label-bold hover:opacity-90 active:scale-95 transition-all whitespace-nowrap disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Subscribe"}
            </button>
          </form>
        )}
        {error && <p className="text-error text-sm">{error}</p>}
        <p className="text-xs text-on-surface-variant/70">No spam, ever.</p>
      </div>
    </section>
  );
}
