import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2026-01-15T00:00:00").getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      <div className="bg-white border-4 border-black shadow-brutal-sm p-6 text-center">
        <div className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
          {timeLeft.days}
        </div>
        <div className="text-sm md:text-base font-bold text-gray-700 uppercase tracking-wide">
          Days
        </div>
      </div>
      <div className="bg-white border-4 border-black shadow-brutal-sm p-6 text-center">
        <div className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
          {timeLeft.hours}
        </div>
        <div className="text-sm md:text-base font-bold text-gray-700 uppercase tracking-wide">
          Hours
        </div>
      </div>
      <div className="bg-white border-4 border-black shadow-brutal-sm p-6 text-center">
        <div className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
          {timeLeft.minutes}
        </div>
        <div className="text-sm md:text-base font-bold text-gray-700 uppercase tracking-wide">
          Minutes
        </div>
      </div>
      <div className="bg-white border-4 border-black shadow-brutal-sm p-6 text-center">
        <div className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
          {timeLeft.seconds}
        </div>
        <div className="text-sm md:text-base font-bold text-gray-700 uppercase tracking-wide">
          Seconds
        </div>
      </div>
    </div>
  );
}

