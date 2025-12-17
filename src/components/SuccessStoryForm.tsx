import { useState } from "react";
import type { FormEvent } from "react";

interface SuccessStoryFormProps {
  onClose: () => void;
}

export default function SuccessStoryForm({ onClose }: SuccessStoryFormProps) {
  const [formData, setFormData] = useState({
    remainAnonymous: false,
    firstName: "",
    surname: "",
    gender: "",
    instagramHandle: "",
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "",
    question6: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!formData.remainAnonymous) {
      if (!formData.firstName.trim()) {
        newErrors.firstName = "First name is required";
      }
      if (!formData.surname.trim()) {
        newErrors.surname = "Surname is required";
      }
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.question1.trim()) {
      newErrors.question1 = "This question is required";
    }
    if (!formData.question2.trim()) {
      newErrors.question2 = "This question is required";
    }
    if (!formData.question3.trim()) {
      newErrors.question3 = "This question is required";
    }
    if (!formData.question4.trim()) {
      newErrors.question4 = "This question is required";
    }
    if (!formData.question5.trim()) {
      newErrors.question5 = "This question is required";
    }
    if (!formData.question6.trim()) {
      newErrors.question6 = "This question is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

    if (!GOOGLE_SCRIPT_URL) {
      throw new Error(
        "VITE_GOOGLE_SCRIPT_URL environment variable is required"
      );
    }

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
      console.error("Error submitting story:", error);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 font-medium mb-4 flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Share Your 2025 Success Story
          </h1>
          <p className="text-lg text-gray-700">
            Help us inspire others by sharing your health and fitness journey.
            We'll use your story to create engaging content for our community.
          </p>
        </div>

        {isSubmitted ? (
          <div className="bg-kulagreen/10 border-4 border-kulagreen p-8 text-center rounded-sm">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Thank You for Sharing Your Story!
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              We'll review your submission and may feature it on our Instagram.
              Keep an eye out!
            </p>
            <button
              onClick={onClose}
              className="bg-kulagreen text-white font-bold px-8 py-4 rounded-sm shadow-brutal hover:shadow-brutal-sm hover:translate-x-1 hover:translate-y-1 transition-all duration-150 text-lg border-4 border-black"
            >
              Return Home
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-gray-50 border-4 border-black p-6 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Personal Information
              </h2>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="remainAnonymous"
                  checked={formData.remainAnonymous}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      remainAnonymous: e.target.checked,
                    })
                  }
                  className="w-5 h-5 border-2 border-black text-kulagreen focus:ring-2 focus:ring-kulayellow cursor-pointer"
                />
                <label
                  htmlFor="remainAnonymous"
                  className="font-medium text-gray-900 cursor-pointer"
                >
                  I would like to remain anonymous
                </label>
              </div>

              {!formData.remainAnonymous && (
                <>
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide"
                    >
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => {
                        setFormData({ ...formData, firstName: e.target.value });
                        if (errors.firstName)
                          setErrors({ ...errors, firstName: "" });
                      }}
                      className={`w-full px-4 py-3 border-4 ${
                        errors.firstName ? "border-red-500" : "border-black"
                      } focus:border-kulagreen focus:ring-4 focus:ring-kulayellow transition-all font-medium`}
                      placeholder="Your first name"
                    />
                    {errors.firstName && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="surname"
                      className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide"
                    >
                      Surname *
                    </label>
                    <input
                      type="text"
                      id="surname"
                      value={formData.surname}
                      onChange={(e) => {
                        setFormData({ ...formData, surname: e.target.value });
                        if (errors.surname)
                          setErrors({ ...errors, surname: "" });
                      }}
                      className={`w-full px-4 py-3 border-4 ${
                        errors.surname ? "border-red-500" : "border-black"
                      } focus:border-kulagreen focus:ring-4 focus:ring-kulayellow transition-all font-medium`}
                      placeholder="Your surname"
                    />
                    {errors.surname && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.surname}
                      </p>
                    )}
                  </div>
                </>
              )}

              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide"
                >
                  Gender *
                </label>
                <select
                  id="gender"
                  value={formData.gender}
                  onChange={(e) => {
                    setFormData({ ...formData, gender: e.target.value });
                    if (errors.gender) setErrors({ ...errors, gender: "" });
                  }}
                  className={`w-full px-4 py-3 border-4 ${
                    errors.gender ? "border-red-500" : "border-black"
                  } focus:border-kulagreen focus:ring-4 focus:ring-kulayellow transition-all font-medium bg-white`}
                >
                  <option value="">Select gender...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
                {errors.gender && (
                  <p className="text-red-600 text-sm mt-1">{errors.gender}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="instagramHandle"
                  className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide"
                >
                  Instagram Handle (Optional)
                </label>
                <input
                  type="text"
                  id="instagramHandle"
                  value={formData.instagramHandle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      instagramHandle: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border-4 border-black focus:border-kulagreen focus:ring-4 focus:ring-kulayellow transition-all font-medium"
                  placeholder="@yourhandle"
                />
                <p className="text-sm text-gray-600 mt-1">
                  We'll tag you when we feature your story (if provided)
                </p>
              </div>
            </div>

            <div className="bg-gray-50 border-4 border-black p-6 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Your Success Story
              </h2>
              <p className="text-gray-700 mb-6">
                Please answer these questions to help us tell your story
                effectively.
              </p>

              <div>
                <label
                  htmlFor="question1"
                  className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide"
                >
                  What was your main health or fitness goal when you started? *
                </label>
                <textarea
                  id="question1"
                  value={formData.question1}
                  onChange={(e) => {
                    setFormData({ ...formData, question1: e.target.value });
                    if (errors.question1)
                      setErrors({ ...errors, question1: "" });
                  }}
                  className={`w-full px-4 py-3 border-4 ${
                    errors.question1 ? "border-red-500" : "border-black"
                  } focus:border-kulagreen focus:ring-4 focus:ring-kulayellow transition-all font-medium resize-none`}
                  placeholder="Describe your starting point and what you wanted to achieve..."
                  rows={4}
                />
                {errors.question1 && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.question1}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="question2"
                  className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide"
                >
                  What challenges did you face along the way? *
                </label>
                <textarea
                  id="question2"
                  value={formData.question2}
                  onChange={(e) => {
                    setFormData({ ...formData, question2: e.target.value });
                    if (errors.question2)
                      setErrors({ ...errors, question2: "" });
                  }}
                  className={`w-full px-4 py-3 border-4 ${
                    errors.question2 ? "border-red-500" : "border-black"
                  } focus:border-kulagreen focus:ring-4 focus:ring-kulayellow transition-all font-medium resize-none`}
                  placeholder="Share the obstacles you overcame..."
                  rows={4}
                />
                {errors.question2 && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.question2}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="question3"
                  className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide"
                >
                  What strategies or habits helped you succeed? *
                </label>
                <textarea
                  id="question3"
                  value={formData.question3}
                  onChange={(e) => {
                    setFormData({ ...formData, question3: e.target.value });
                    if (errors.question3)
                      setErrors({ ...errors, question3: "" });
                  }}
                  className={`w-full px-4 py-3 border-4 ${
                    errors.question3 ? "border-red-500" : "border-black"
                  } focus:border-kulagreen focus:ring-4 focus:ring-kulayellow transition-all font-medium resize-none`}
                  placeholder="What worked for you? What routines or approaches made a difference?"
                  rows={4}
                />
                {errors.question3 && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.question3}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="question4"
                  className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide"
                >
                  What results have you achieved? (Be specific with numbers if
                  possible) *
                </label>
                <textarea
                  id="question4"
                  value={formData.question4}
                  onChange={(e) => {
                    setFormData({ ...formData, question4: e.target.value });
                    if (errors.question4)
                      setErrors({ ...errors, question4: "" });
                  }}
                  className={`w-full px-4 py-3 border-4 ${
                    errors.question4 ? "border-red-500" : "border-black"
                  } focus:border-kulagreen focus:ring-4 focus:ring-kulayellow transition-all font-medium resize-none`}
                  placeholder="Share your achievements - weight loss, strength gains, health improvements, etc..."
                  rows={4}
                />
                {errors.question4 && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.question4}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="question5"
                  className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide"
                >
                  How has this transformation impacted your life beyond just the
                  physical changes? *
                </label>
                <textarea
                  id="question5"
                  value={formData.question5}
                  onChange={(e) => {
                    setFormData({ ...formData, question5: e.target.value });
                    if (errors.question5)
                      setErrors({ ...errors, question5: "" });
                  }}
                  className={`w-full px-4 py-3 border-4 ${
                    errors.question5 ? "border-red-500" : "border-black"
                  } focus:border-kulagreen focus:ring-4 focus:ring-kulayellow transition-all font-medium resize-none`}
                  placeholder="How has your confidence, energy, relationships, or overall well-being changed?"
                  rows={4}
                />
                {errors.question5 && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.question5}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="question6"
                  className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide"
                >
                  What advice would you give to someone just starting their
                  health journey? *
                </label>
                <textarea
                  id="question6"
                  value={formData.question6}
                  onChange={(e) => {
                    setFormData({ ...formData, question6: e.target.value });
                    if (errors.question6)
                      setErrors({ ...errors, question6: "" });
                  }}
                  className={`w-full px-4 py-3 border-4 ${
                    errors.question6 ? "border-red-500" : "border-black"
                  } focus:border-kulagreen focus:ring-4 focus:ring-kulayellow transition-all font-medium resize-none`}
                  placeholder="Share your wisdom and encouragement..."
                  rows={4}
                />
                {errors.question6 && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.question6}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-4 border-4 border-black bg-white text-gray-900 font-bold hover:bg-gray-100 hover:translate-x-1 hover:translate-y-1 shadow-brutal-sm hover:shadow-none transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-kulagreen text-white font-bold px-6 py-4 border-4 border-black hover:bg-kulagreen-dark hover:translate-x-1 hover:translate-y-1 shadow-brutal-sm hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit Story"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
