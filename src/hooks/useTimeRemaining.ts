import { useEffect, useState } from "react";

/**
 * A React hook that returns the time remaining until a given ISO date.
 * It updates every second and automatically formats the output as:
 * "X seconds/minutes/hours/days left" or "Time expired".
 */
export function useTimeRemaining(isoDate: string | undefined): string {
  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    if (!isoDate) return;

    const updateRemaining = () => {
      const now = new Date();
      const target = new Date(isoDate);
      const diffMs = target.getTime() - now.getTime();

      if (diffMs <= 0) {
        setTimeRemaining("Time expired");
        return;
      }

      const MS_PER_SECOND = 1000;
      const MS_PER_MINUTE = 60 * MS_PER_SECOND;
      const MS_PER_HOUR = 60 * MS_PER_MINUTE;
      const MS_PER_DAY = 24 * MS_PER_HOUR;

      let formatted = "";

      if (diffMs < MS_PER_MINUTE) {
        const seconds = Math.ceil(diffMs / MS_PER_SECOND);
        formatted = `${seconds} second${seconds === 1 ? "" : "s"} left`;
      } else if (diffMs < MS_PER_HOUR) {
        const minutes = Math.ceil(diffMs / MS_PER_MINUTE);
        formatted = `${minutes} minute${minutes === 1 ? "" : "s"} left`;
      } else if (diffMs < MS_PER_DAY) {
        const hours = Math.ceil(diffMs / MS_PER_HOUR);
        formatted = `${hours} hour${hours === 1 ? "" : "s"} left`;
      } else {
        const days = Math.ceil(diffMs / MS_PER_DAY);
        formatted = `${days} day${days === 1 ? "" : "s"} left`;
      }

      setTimeRemaining(formatted);
    };

    // Update immediately, then every second
    updateRemaining();
    const interval = setInterval(updateRemaining, 1000);

    return () => clearInterval(interval);
  }, [isoDate]);

  return timeRemaining;
}
