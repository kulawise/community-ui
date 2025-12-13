import MetricCard from "./MetricCard";

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

export default function MetricsDashboard({ metrics }: MetricsDashboardProps) {
  const defaultMetrics: Metrics = {
    totalDistance: "1,482 km",
    gymSessions: 312,
    activeMembers: 487,
    calorieTargetHits: 234,
    membersWhoFasted: 189,
  };

  const displayMetrics = metrics || defaultMetrics;

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
          <MetricCard
            value={displayMetrics.totalDistance || "1,482 km"}
            label="Total Distance Walked"
            color="green"
            image="/images/health-metrics.jpg"
          />
          <MetricCard
            value={`${displayMetrics.gymSessions || 312}`}
            label="Gym Sessions"
            color="purple"
            image="/images/gym-pic.jpg"
          />
          <MetricCard
            value={`${displayMetrics.activeMembers || 487}`}
            label="Active Members"
            color="red"
            image="/images/group-exercise.jpg"
          />
          <MetricCard
            value={`${displayMetrics.calorieTargetHits || 234}`}
            label="Members Hit Calorie Target"
            color="brown"
            image="/images/dan-gold-unsplash.jpg"
          />
          <MetricCard
            value={`${displayMetrics.membersWhoFasted || 189}`}
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
