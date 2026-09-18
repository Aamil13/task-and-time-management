import { StatusPill } from "@/components/atoms/statusPill";
import { formatDateTime, formatTotalDuration } from "@/lib/format";
import { TimeLog } from "@/services/time-log";
import { FiClock } from "react-icons/fi";

interface LogsTableProps {
  logs: TimeLog[];
  showTaskId?: boolean;
}

export function LogsTable({ logs }: LogsTableProps) {
  if (logs.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border bg-background-secondary/70 px-6 py-12 text-center">
        <FiClock className="h-8 w-8 text-icon-muted" aria-hidden="true" />
        <p className="text-sm font-medium text-foreground">No time logs yet</p>
        <p className="text-sm text-text-secondary">Start tracking a task to see logs here.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-background-secondary/60">
              <th className="px-4 py-3 text-left font-medium text-text-secondary">Started</th>
              <th className="px-4 py-3 text-left font-medium text-text-secondary">Ended</th>
              <th className="px-4 py-3 text-right font-medium text-text-secondary">Duration</th>
              <th className="px-4 py-3 text-left font-medium text-text-secondary">Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr
                key={log._id}
                className="border-b border-border last:border-0 hover:bg-background-secondary/40 transition-colors"
              >
                <td className="px-4 py-3 text-foreground">{formatDateTime(log.startedAt)}</td>
                <td className="px-4 py-3 text-text-secondary">
                  {log.endedAt ? formatDateTime(log.endedAt) : <span className="text-emerald-600 dark:text-emerald-400">Running…</span>}
                </td>
                <td className="px-4 py-3 text-right font-mono text-foreground">
                  {formatTotalDuration(log?.durationSeconds)}
                </td>
                <td className="px-4 py-3">
                  <StatusPill status={log.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
