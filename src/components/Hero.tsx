import { motion } from "framer-motion";

interface HeroProps {
  onJoinClick: () => void;
}

export default function Hero({ onJoinClick }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-br from-kulagreen/10 to-kulayellow/20 opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Striving for better health is important, but you don't have to do
              it alone.
            </h1>
            <p className="text-lg md:text-xl font-medium text-gray-700 mb-8 max-w-2xl mx-auto md:mx-0">
              Join our community, track your health metrics, stay accountable
              with friends, gain the motivation to stay consistent because we
              got you.
            </p>
            <button
              onClick={onJoinClick}
              className="bg-kulagreen text-white font-bold px-8 py-4 rounded-sm shadow-brutal hover:shadow-brutal-sm hover:translate-x-1 hover:translate-y-1 transition-all duration-150 text-lg border-4 border-black"
            >
              Join the Community
            </button>
          </div>

          <div className="relative order-first md:order-last">
            <div className="relative h-[500px] md:h-[600px]">
              <motion.div
                className="absolute border-4 border-black shadow-brutal bg-kulablue"
                animate={{
                  top: [0, 10, 20, 0],
                  left: ["0%", "5%", "10%", "0%"],
                  width: ["90%", "85%", "80%", "90%"],
                  height: [440, 420, 400, 440],
                  zIndex: [30, 20, 10, 30],
                  rotate: [-1, 1, -2, -1],
                }}
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <img
                  src="/images/gym-pic.jpg"
                  alt="Gym workout"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-kulablue/60 to-transparent"></div>
              </motion.div>

              <motion.div
                className="absolute border-4 border-black shadow-brutal bg-kulabrown"
                animate={{
                  top: [10, 20, 0, 10],
                  left: ["5%", "10%", "0%", "5%"],
                  width: ["85%", "80%", "90%", "85%"],
                  height: [420, 400, 440, 420],
                  zIndex: [20, 10, 30, 20],
                  rotate: [1, -2, -1, 1],
                }}
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 3,
                }}
              >
                <img
                  src="/images/afere-afang.jpg"
                  alt="Healthy meal"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-kulabrown/60 to-transparent"></div>
              </motion.div>

              <motion.div
                className="absolute border-4 border-black shadow-brutal-lg bg-kulagreen"
                animate={{
                  top: [20, 0, 10, 20],
                  left: ["10%", "0%", "5%", "10%"],
                  width: ["80%", "90%", "85%", "80%"],
                  height: [400, 440, 420, 400],
                  zIndex: [10, 30, 20, 10],
                  rotate: [-2, -1, 1, -2],
                }}
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 6,
                }}
              >
                <img
                  src="/images/group-exercise.jpg"
                  alt="Community exercise"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-kulagreen/70 to-transparent"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
