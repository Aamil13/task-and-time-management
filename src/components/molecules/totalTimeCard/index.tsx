import { formatTotalDuration } from "@/lib/format";
import { FiClock } from "react-icons/fi";

export function TotalTimeCard({ seconds }: { seconds: number }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
        <FiClock className="h-5 w-5 text-primary" aria-hidden="true" />
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-text-muted">Total time</p>
        <p className="mt-0.5 text-xl font-semibold text-heading">{formatTotalDuration(seconds)}</p>
      </div>
    </div>
  );
}