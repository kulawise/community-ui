import { Link } from "react-router-dom";

interface HeroProps {
  onJoinClick: () => void;
}

export default function Hero({ onJoinClick }: HeroProps) {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-surface-container-low px-gutter py-20">
      <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8">
          <h1 className="font-headline-xl text-headline-xl text-on-surface leading-tight">
            Your health, guided by{" "}
            <span className="text-primary">AI</span> and powered by{" "}
            <span className="text-sdg-good-health">Community</span>.
          </h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant max-w-xl">
            Bridging the gap between individual wellness and community
            accountability through data-driven habits and Circles that keep
            you consistent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onJoinClick}
              className="bg-primary text-on-primary px-8 py-4 rounded-lg font-headline-md text-body-md hover:opacity-90 transition-opacity active:scale-95"
            >
              Join Waitlist
            </button>
            <Link
              to="/impact"
              className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-headline-md text-body-md hover:bg-primary/5 transition-colors text-center"
            >
              Explore Impact
            </Link>
          </div>
        </div>
        <div className="relative group">
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/20 transform group-hover:scale-[1.02] transition-transform duration-500">
            <img
              className="w-full h-auto object-cover"
              alt="Kulawise app showing AI-guided health metrics"
              src="/images/health-metrics.jpg"
            />
          </div>
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-sdg-good-health/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primary/20 rounded-full blur-3xl"></div>
        </div>
      </div>
    </section>
  );
}
