import type { TimeLog } from "@/services/time-log/types";

export function StatusPill({ status }: { status: TimeLog["status"] }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
        status === "ACTIVE"
          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
          : "bg-background-secondary text-text-secondary"
      }`}
    >
      {status === "ACTIVE" ? "Active" : "Completed"}
    </span>
  );
}
