import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 w-full bg-kulagreen text-white py-3 px-4 text-center z-50">
        <Link
          to="/2025-bingo"
          className="text-sm md:text-base font-bold hover:underline cursor-pointer block"
        >
          Take the 2025 Health Bingo Quiz to know your health score
        </Link>
      </div>
      <section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-kulagreen/10 to-kulayellow/20 opacity-50"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                Join the Kulawise, Health & Fitness Community for 2026
              </h1>
              <p className="text-lg md:text-xl font-medium text-gray-700 mb-8 max-w-2xl mx-auto md:mx-0">
                As we prepare for 2026, many people are setting health and
                fitness goals: more gym check-ins, healthier meals, better
                portion control, and consistency. But these goals are hard to
                achieve alone. Real progress comes from accountability, and
                accountability is easier when you're part of a community working
                toward the same goal: staying healthy.
              </p>
            </div>

            <div className="relative order-first md:order-last">
              <div className="bg-white border-4 border-black shadow-brutal overflow-hidden rotate-2">
                <div className="relative h-[400px] md:h-[500px]">
                  <img
                    src="/images/young-woman-training-gym.jpg"
                    alt="Join the community"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
