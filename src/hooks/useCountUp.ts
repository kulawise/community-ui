import { useState, useEffect } from "react";

interface UseCountUpOptions {
  duration?: number;
  startOnMount?: boolean;
}

export function useCountUp(
  targetValue: number,
  options: UseCountUpOptions = {}
) {
  const { duration = 2000, startOnMount = true } = options;
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!startOnMount) return;

    setIsAnimating(true);
    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuart);

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(targetValue);
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(animate);
  }, [targetValue, duration, startOnMount]);

  return { count, isAnimating };
}

