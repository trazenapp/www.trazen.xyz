import { useMemo } from 'react';

export function useTimeAgo(dateString: string | undefined): string {
  return useMemo(() => {
    if (!dateString) return '';
    
    const pastTime = new Date(dateString);
    const currentTime = new Date();

    // Calculate difference in milliseconds
    const timeDifferenceMs = currentTime.getTime() - pastTime.getTime();

    // Handle future dates (if time difference is negative)
    if (timeDifferenceMs < 0) {
      // You can customize this to show "in X hours" if needed
      return "just now";
    }

    // Define conversion constants
    const MS_PER_SECOND = 1000;
    const MS_PER_MINUTE = MS_PER_SECOND * 60;
    const MS_PER_HOUR = MS_PER_MINUTE * 60;
    const MS_PER_DAY = MS_PER_HOUR * 24;

    // 1. Check Seconds (less than 1 minute)
    if (timeDifferenceMs < MS_PER_MINUTE) {
      const seconds = Math.round(timeDifferenceMs / MS_PER_SECOND);
      return seconds <= 1 ? "1 second ago" : `${seconds} seconds ago`;
    }

    // 2. Check Minutes (less than 1 hour)
    if (timeDifferenceMs < MS_PER_HOUR) {
      const minutes = Math.round(timeDifferenceMs / MS_PER_MINUTE);
      return minutes <= 1 ? "1 minute ago" : `${minutes} minutes ago`;
    }

    // 3. Check Hours (less than 1 day)
    if (timeDifferenceMs < MS_PER_DAY) {
      const hours = Math.round(timeDifferenceMs / MS_PER_HOUR);
      return hours <= 1 ? "1 hour ago" : `${hours} hours ago`;
    }

    // 4. Check Days (1 day or more)
    if (timeDifferenceMs >= MS_PER_DAY) {
      const days = Math.round(timeDifferenceMs / MS_PER_DAY);
      return days <= 1 ? "1 day ago" : `${days} days ago`;
    }

    // Final fallback (should only happen for times very close to 'now')
    return "just now";
  }, [dateString]);
}