/** Formats a duration in seconds as a compact label, e.g. "2h 15m", "45m", "0m". */
export function formatDuration(totalSeconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);

  if (hours === 0 && minutes === 0) return "0m";
  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
}

/** Formats a duration in seconds as a ticking stopwatch clock, e.g. "05:42" or "01:05:42". */
export function formatElapsedClock(totalSeconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = Math.floor(safeSeconds % 60);
  const pad = (value: number) => value.toString().padStart(2, "0");

  return hours > 0 ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}` : `${pad(minutes)}:${pad(seconds)}`;
}

export type DueDateTone = "neutral" | "warning" | "danger";

/** Converts an ISO timestamp to a `YYYY-MM-DD` value for `<input type="date">`. */
export function toDateInputValue(iso?: string): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Formats an ISO due date relative to today, with a tone for overdue/today emphasis. */
export function formatDueDate(iso: string): { label: string; tone: DueDateTone } {
  const due = new Date(iso);
  const now = new Date();
  const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  const diffDays = Math.round((startOfDay(due) - startOfDay(now)) / 86_400_000);
  const shortDate = due.toLocaleDateString(undefined, { month: "short", day: "numeric" });

  if (diffDays < 0) return { label: `Overdue \u00b7 ${shortDate}`, tone: "danger" };
  if (diffDays === 0) return { label: "Due today", tone: "warning" };
  if (diffDays === 1) return { label: "Due tomorrow", tone: "neutral" };
  return { label: `Due ${shortDate}`, tone: "neutral" };
}