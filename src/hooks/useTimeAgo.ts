import { useMemo } from 'react';

export function useTimeAgo(dateString: string | undefined): string {
  return useMemo(() => {
    if (!dateString) return '';
    
    const pastTime = new Date(dateString);
    const currentTime = new Date();

    const timeDifferenceMs = currentTime.getTime() - pastTime.getTime();

    if (timeDifferenceMs < 0) {
      return "just now";
    }

    const MS_PER_SECOND = 1000;
    const MS_PER_MINUTE = MS_PER_SECOND * 60;
    const MS_PER_HOUR = MS_PER_MINUTE * 60;
    const MS_PER_DAY = MS_PER_HOUR * 24;

    if (timeDifferenceMs < MS_PER_MINUTE) {
      const seconds = Math.round(timeDifferenceMs / MS_PER_SECOND);
      return seconds <= 1 ? "1 second ago" : `${seconds} seconds ago`;
    }

    if (timeDifferenceMs < MS_PER_HOUR) {
      const minutes = Math.round(timeDifferenceMs / MS_PER_MINUTE);
      return minutes <= 1 ? "1 minute ago" : `${minutes} minutes ago`;
    }

    if (timeDifferenceMs < MS_PER_DAY) {
      const hours = Math.round(timeDifferenceMs / MS_PER_HOUR);
      return hours <= 1 ? "1 hour ago" : `${hours} hours ago`;
    }

    if (timeDifferenceMs >= MS_PER_DAY) {
      const days = Math.round(timeDifferenceMs / MS_PER_DAY);
      return days <= 1 ? "1 day ago" : `${days} days ago`;
    }

    return "just now";
  }, [dateString]);
}