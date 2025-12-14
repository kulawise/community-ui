import MetricCard from "./MetricCard";
import { useCountUp } from "../hooks/useCountUp";

interface Metrics {
  totalDistance?: string;
  gymSessions?: number;
  activeMembers?: number;
  calorieTargetHits?: number;
  membersWhoFasted?: number;
}

interface MetricsDashboardProps {
  metrics?: Metrics;
}

function AnimatedMetricCard({
  targetValue,
  label,
  color,
  image,
  suffix = "",
}: {
  targetValue: number;
  label: string;
  color: "green" | "blue" | "purple" | "red" | "brown";
  image?: string;
  suffix?: string;
}) {
  const { count } = useCountUp(targetValue, { duration: 2000 });
  const formattedValue = count.toLocaleString() + suffix;

  return (
    <MetricCard
      value={formattedValue}
      label={label}
      color={color}
      image={image}
    />
  );
}

export default function MetricsDashboard({ metrics }: MetricsDashboardProps) {
  const defaultMetrics: Metrics = {
    totalDistance: "1,482 km",
    gymSessions: 312,
    activeMembers: 1687,
    calorieTargetHits: 234,
    membersWhoFasted: 189,
  };

  const displayMetrics = metrics || defaultMetrics;

  const extractNumber = (
    value: string | number | undefined,
    fallback: number
  ): number => {
    if (typeof value === "number") return value;
    if (typeof value === "string") {
      const num = parseFloat(value.replace(/[^\d.]/g, ""));
      return isNaN(num) ? fallback : num;
    }
    return fallback;
  };

  const extractSuffix = (value: string | number | undefined): string => {
    if (typeof value === "string" && value.includes("km")) {
      return " km";
    }
    return "";
  };

  return (
    <section className="bg-gradient-to-br from-gray-50 to-kulayellow/20 py-20 sm:py-24 relative overflow-hidden">
      <div className="absolute top-10 right-10 w-32 h-32 bg-kulagreen/20 border-4 border-black rotate-12"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-kulapurple/20 border-4 border-black -rotate-12"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Community Impact
          </h2>
          <div className="mb-4">
            <span className="inline-block bg-kulagreen text-white font-bold px-6 py-2 rounded-sm border-4 border-black shadow-brutal-sm text-base md:text-lg">
              Today's Metrics
            </span>
          </div>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Together, we're building healthier habits and achieving amazing
            milestones
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatedMetricCard
            targetValue={extractNumber(displayMetrics.totalDistance, 1482)}
            suffix={extractSuffix(displayMetrics.totalDistance)}
            label="Total Distance Walked"
            color="green"
            image="/images/health-metrics.jpg"
          />
          <AnimatedMetricCard
            targetValue={displayMetrics.gymSessions || 312}
            label="Gym Sessions"
            color="purple"
            image="/images/gym-pic.jpg"
          />
          <AnimatedMetricCard
            targetValue={displayMetrics.activeMembers || 487}
            label="Active Members"
            color="red"
            image="/images/group-exercise.jpg"
          />
          <AnimatedMetricCard
            targetValue={displayMetrics.calorieTargetHits || 234}
            label="Members Hit Calorie Target"
            color="brown"
            image="/images/dan-gold-unsplash.jpg"
          />
          <AnimatedMetricCard
            targetValue={displayMetrics.membersWhoFasted || 189}
            label="Members Who Fasted"
            color="blue"
            image="/images/afere-afang.jpg"
          />
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-white border-4 border-black shadow-brutal-sm px-8 py-4">
            <p className="text-lg font-bold text-gray-900">
              Join thousands building healthier lives together
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
