"use client";

import { useSearchParams } from "next/navigation";
import { FiClock, FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

import { useGetLogsForUser, useGetUserAllTaskTimeTotal } from "@/services/time-log";
import { useGetLogsForTask, useGetTaskTimeTotal } from "@/services/time-log";
import { useGetTaskById } from "@/services/task";
import type { TimeLog } from "@/services/time-log/types";

// ─── helpers ────────────────────────────────────────────────────────────────

function formatDuration(seconds: number | undefined): string {
  if (!seconds || seconds <= 0) return "—";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}



// ─── sub-components ─────────────────────────────────────────────────────────

function LogsTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-background-secondary/60">
              <th className="px-4 py-3 text-left font-medium text-text-secondary">Started</th>
              <th className="px-4 py-3 text-left font-medium text-text-secondary">Ended</th>
              <th className="px-4 py-3 text-left font-medium text-text-secondary">Duration</th>
              <th className="px-4 py-3 text-left font-medium text-text-secondary">Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                {Array.from({ length: 4 }).map((_, j) => (
                  <td key={j} className="px-4 py-3">
                    <div className="h-4 w-28 animate-pulse rounded bg-background-secondary" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: TimeLog["status"] }) {
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

interface LogsTableProps {
  logs: TimeLog[];
  showTaskId?: boolean;
}

function LogsTable({ logs }: LogsTableProps) {
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
                  {formatDuration(log?.durationSeconds)}
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

function TotalTimeCard({ seconds }: { seconds: number }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 shadow-sm">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
        <FiClock className="h-5 w-5 text-primary" aria-hidden="true" />
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-text-muted">Total time</p>
        <p className="mt-0.5 text-xl font-semibold text-heading">{formatDuration(seconds)}</p>
      </div>
    </div>
  );
}

// ─── task-specific view ──────────────────────────────────────────────────────

function TaskLogsView({ taskId }: { taskId: string }) {
  const { data: logsData, isLoading: logsLoading } = useGetLogsForTask(taskId);
  const { data: totalData } = useGetTaskTimeTotal(taskId);
  const { data: taskData } = useGetTaskById(taskId);

  const logs = logsData?.data?.timeLogs ?? [];
  const totalSecs = totalData?.data?.total.totalDurationSeconds ?? 0;
console.log("taskData",taskData)
  
  const taskTitle = taskData?.title;

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <Link
            href="/dashboard/tracking"
            className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-text-secondary transition-colors hover:bg-background-secondary hover:text-foreground"
            aria-label="Back to all logs"
          >
            <FiArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-heading">Time Logs</h1>
            {taskTitle && (
              <p className="mt-1 text-sm text-text-secondary">
                Showing logs for <span className="font-medium text-foreground">{taskTitle}</span>
              </p>
            )}
          </div>
        </div>
        <TotalTimeCard seconds={totalSecs} />
      </div>

      {/* Table */}
      {logsLoading ? <LogsTableSkeleton /> : <LogsTable logs={logs} />}
    </div>
  );
}

// ─── all-logs view ───────────────────────────────────────────────────────────

function AllLogsView() {
  const { data, isLoading } = useGetLogsForUser();
  const logs = data?.data?.timeLogs ?? [];
  const {data:totalTime} = useGetUserAllTaskTimeTotal()
  const time = totalTime?.data?.total?.totalDurationSeconds

  
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-heading">Time Tracking</h1>
          <p className="mt-1 text-sm text-text-secondary">All your tracked sessions in one place.</p>
        </div>
        <TotalTimeCard seconds={time} />
      </div>

      {/* Table */}
      {isLoading ? <LogsTableSkeleton /> : <LogsTable logs={logs} />}
    </div>
  );
}

// ─── page ────────────────────────────────────────────────────────────────────

export default function TrackingPage() {
  const searchParams = useSearchParams();
  const taskId = searchParams.get("taskId");

  return taskId ? <TaskLogsView taskId={taskId} /> : <AllLogsView />;
}
