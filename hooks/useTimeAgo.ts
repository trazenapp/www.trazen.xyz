import { useMemo } from "react";

export function useTimeAgo(dateString: string | undefined): string {
  return useMemo(() => {
    if (!dateString) return "";

    const past = new Date(dateString);
    const now = new Date();

    let diffMs = now.getTime() - past.getTime();

    // Handle future dates (optional customization)
    if (diffMs < 0) return "just now";

    // Constants
    const MS_PER_SECOND = 1000;
    const MS_PER_MINUTE = 60 * MS_PER_SECOND;
    const MS_PER_HOUR = 60 * MS_PER_MINUTE;
    const MS_PER_DAY = 24 * MS_PER_HOUR;

    // Round up progressively
    if (diffMs < MS_PER_MINUTE) {
      const seconds = Math.round(diffMs / MS_PER_SECOND);
      return seconds <= 1 ? "1 second ago" : `${seconds} seconds ago`;
    }

    if (diffMs < MS_PER_HOUR) {
      const minutes = Math.round(diffMs / MS_PER_MINUTE);
      return minutes <= 1 ? "1 minute ago" : `${minutes} minutes ago`;
    }

    if (diffMs < MS_PER_DAY) {
      const hours = Math.round(diffMs / MS_PER_HOUR);
      return hours <= 1 ? "1 hour ago" : `${hours} hours ago`;
    }

    const days = Math.round(diffMs / MS_PER_DAY);
    return days <= 1 ? "1 day ago" : `${days} days ago`;
  }, [dateString]);
}