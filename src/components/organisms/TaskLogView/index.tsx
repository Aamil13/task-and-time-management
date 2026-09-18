import { LogsTable } from "@/components/molecules/logsTable";
import { LogsTableSkeleton } from "@/components/molecules/tableSkeleton";
import { TotalTimeCard } from "@/components/molecules/totalTimeCard";
import { useGetTaskById } from "@/services";
import { useGetLogsForTask, useGetTaskTimeTotal } from "@/services/time-log";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export function TaskLogsView({ taskId }: { taskId: string }) {
  const { data: logsData, isLoading: logsLoading } = useGetLogsForTask(taskId);
  const { data: totalData } = useGetTaskTimeTotal(taskId);
  const { data: taskData } = useGetTaskById(taskId);

  const logs = logsData?.data?.timeLogs ?? [];
  const totalSecs = totalData?.data?.total.totalDurationSeconds ?? 0;

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