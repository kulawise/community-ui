interface MetricCardProps {
  value: string;
  label: string;
  color: "green" | "blue" | "purple" | "red" | "brown";
  image?: string;
}

const colorClasses = {
  green: {
    bg: "bg-kulagreen",
    border: "border-kulagreen-dark",
    text: "text-white",
    accent: "bg-kulayellow",
    overlay: "bg-[#1db470]/75",
  },
  blue: {
    bg: "bg-kulablue",
    border: "border-kulablue",
    text: "text-white",
    accent: "bg-kulayellow",
    overlay: "bg-[#103d71]/75",
  },
  purple: {
    bg: "bg-kulapurple",
    border: "border-kulapurple",
    text: "text-white",
    accent: "bg-kulayellow",
    overlay: "bg-[#7e57c2]/75",
  },
  red: {
    bg: "bg-kulared",
    border: "border-kulared",
    text: "text-white",
    accent: "bg-kulayellow",
    overlay: "bg-[#b2403e]/75",
  },
  brown: {
    bg: "bg-kulabrown",
    border: "border-kulabrown",
    text: "text-white",
    accent: "bg-kulayellow",
    overlay: "bg-[#ab7f4a]/75",
  },
};

export default function MetricCard({
  value,
  label,
  color,
  image,
}: MetricCardProps) {
  const colors = colorClasses[color];

  return (
    <div
      className={`relative ${colors.bg} border-4 border-black shadow-brutal hover:shadow-brutal-sm hover:translate-x-1 hover:translate-y-1 transition-all duration-150 overflow-hidden group`}
    >
      {image && (
        <>
          <img
            src={image}
            alt={label}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className={`absolute inset-0 ${colors.overlay}`}></div>
        </>
      )}

      <div
        className={`absolute top-0 left-0 w-full h-2 ${colors.accent} border-b-4 border-black`}
      ></div>

      <div className="relative p-6 md:p-8 z-10">
        <div className="flex flex-col">
          <div
            className={`text-4xl md:text-5xl font-extrabold ${colors.text} mb-2 leading-none drop-shadow-lg`}
          >
            {value}
          </div>
          <div
            className={`text-base md:text-lg font-bold ${colors.text} uppercase tracking-wide drop-shadow-md`}
          >
            {label}
          </div>
        </div>

        <div
          className={`absolute bottom-0 right-0 w-16 h-16 ${colors.accent} border-t-4 border-l-4 border-black`}
        ></div>
      </div>
    </div>
  );
}
