interface ActionGridProps {
  onSurveyClick: () => void;
  onShareStoryClick: () => void;
  telegramLink?: string;
}

export default function ActionGrid({
  onSurveyClick,
  onShareStoryClick,
  telegramLink = "https://t.me/kulawise",
}: ActionGridProps) {
  const actions = [
    {
      title: "Join the Community",
      description:
        "Connect with thousands of people working toward better health. Get support, share progress, and stay accountable together.",
      image: "/images/young-woman-training-gym.jpg",
      buttonText: "Join Community",
      buttonColor: "bg-kulagreen",
      action: () => {
        window.open(telegramLink, "_blank", "noopener,noreferrer");
      },
    },
    {
      title: "Share Your 2025 Success Story",
      description:
        "Tell us how you achieved your fitness and health goals this year. We spotlight inspiring stories on our Instagram!",
      image: "/images/health-metrics.jpg",
      buttonText: "Share Your Story",
      buttonColor: "bg-kulapurple",
      action: onShareStoryClick,
    },
    {
      title: "Take a Quick Survey",
      description:
        "Help us understand your health goals and what matters most to you. Your input helps us build a better community.",
      image: "/images/gym-pic.jpg",
      buttonText: "Take Survey",
      buttonColor: "bg-kulablue",
      action: onSurveyClick,
    },
  ];

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {actions.map((action, index) => (
            <div
              key={index}
              className="bg-white border-4 border-black shadow-brutal hover:shadow-brutal-sm transition-all duration-150 overflow-hidden"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={action.image}
                  alt={action.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {action.title}
                </h3>
                <p className="text-gray-700 mb-6">{action.description}</p>
                <button
                  onClick={action.action}
                  className={`${action.buttonColor} text-white font-bold px-6 py-3 rounded-sm shadow-brutal-sm hover:shadow-brutal-sm hover:translate-x-1 hover:translate-y-1 transition-all duration-150 text-base border-4 border-black w-full`}
                >
                  {action.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
