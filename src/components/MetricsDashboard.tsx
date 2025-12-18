import CountdownTimer from "./CountdownTimer";
// import MetricCard from "./MetricCard";
// import { useCountUp } from "../hooks/useCountUp";

// interface Metrics {
//   totalDistance?: string;
//   gymSessions?: number;
//   activeMembers?: number;
//   calorieTargetHits?: number;
//   membersWhoFasted?: number;
// }

// interface MetricsDashboardProps {
//   metrics?: Metrics;
// }

// function AnimatedMetricCard({
//   targetValue,
//   label,
//   color,
//   image,
//   suffix = "",
// }: {
//   targetValue: number;
//   label: string;
//   color: "green" | "blue" | "purple" | "red" | "brown";
//   image?: string;
//   suffix?: string;
// }) {
//   const { count } = useCountUp(targetValue, { duration: 2000 });
//   const formattedValue = count.toLocaleString() + suffix;

//   return (
//     <MetricCard
//       value={formattedValue}
//       label={label}
//       color={color}
//       image={image}
//     />
//   );
// }

export default function MetricsDashboard() {
  // const defaultMetrics: Metrics = {
  //   totalDistance: "1,482 km",
  //   gymSessions: 312,
  //   activeMembers: 1687,
  //   calorieTargetHits: 234,
  //   membersWhoFasted: 189,
  // };

  // const displayMetrics = metrics || defaultMetrics;

  // const extractNumber = (
  //   value: string | number | undefined,
  //   fallback: number
  // ): number => {
  //   if (typeof value === "number") return value;
  //   if (typeof value === "string") {
  //     const num = parseFloat(value.replace(/[^\d.]/g, ""));
  //     return isNaN(num) ? fallback : num;
  //   }
  //   return fallback;
  // };

  // const extractSuffix = (value: string | number | undefined): string => {
  //   if (typeof value === "string" && value.includes("km")) {
  //     return " km";
  //   }
  //   return "";
  // };

  return (
    <section className="bg-gradient-to-br from-gray-50 to-kulayellow/20 py-20 sm:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Join the Kulawise, Health & Fitness Community for 2026
          </h2>
          {/* <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            As we prepare for 2026, many people are setting health and fitness
            goals — more gym check-ins, healthier meals, better portion control,
            and consistency.
            <br />
            <br />
            But these goals are hard to achieve alone. Real progress comes from
            accountability, and accountability is easier when you're part of a
            community working toward the same goal: staying healthy.
          </p> */}
        </div>

        <div className="mb-12">
          <div className="text-center mb-6">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              The community kicks off on January 15, 2026
            </h3>
            <p className="text-base md:text-lg text-gray-600">
              Countdown to kickoff
            </p>
          </div>
          <CountdownTimer />
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
        </div> */}

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
