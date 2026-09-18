import { LogsTable } from "@/components/molecules/logsTable";
import { LogsTableSkeleton } from "@/components/molecules/tableSkeleton";
import { TotalTimeCard } from "@/components/molecules/totalTimeCard";
import { useGetLogsForUser, useGetUserAllTaskTimeTotal } from "@/services/time-log";

export function AllLogsView() {
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
