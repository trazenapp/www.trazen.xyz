import { useMemo } from "react";

/**
 * React hook to generate a Google Calendar event link.
 *
 * @param title - Event title
 * @param isoStart - ISO start date (e.g., "2025-10-09T16:47:04.560Z")
 * @param durationMinutes - Duration in minutes (default: 60)
 * @param details - Optional event description
 * @param location - Optional event location
 * @returns A memoized Google Calendar link string
 */
export function useGoogleCalendarLink(
  title: string,
  isoStart: string | undefined,
  durationMinutes = 60,
  details?: string,
  location?: string
): string {
  return useMemo(() => {
    if (!isoStart) return "";

    const start = new Date(isoStart);
    const end = new Date(start.getTime() + durationMinutes * 60 * 1000);

    const formatDate = (date: Date) =>
      date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    const startStr = formatDate(start);
    const endStr = formatDate(end);

    const url = new URL("https://calendar.google.com/calendar/render");
    url.searchParams.set("action", "TEMPLATE");
    url.searchParams.set("text", title);
    url.searchParams.set("dates", `${startStr}/${endStr}`);
    if (details) url.searchParams.set("details", details);
    if (location) url.searchParams.set("location", location);

    return url.toString();
  }, [title, isoStart, durationMinutes, details, location]);
}
