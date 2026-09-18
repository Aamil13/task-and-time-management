"use client";

import { useStore } from "@/store";
import { TaskList } from "@/components/organisms/taskList";
import Link from "next/link";
import { FiArrowRightCircle, FiCheckCircle, FiClock, FiList, FiLoader } from "react-icons/fi";
import { useGetDailySummary } from "@/services/summary";
import { useGetAllTasks } from "@/services/task";
import { formatTotalDuration } from "@/lib/format";
import { StatCard } from "@/components/atoms/statCard";

export default function DashboardPage() {
  const user = useStore((state) => state.user);
  const { data: summary, isLoading } = useGetDailySummary();
  const { data: tasksData, isLoading: isTasksLoading } = useGetAllTasks(1, 5);
  const recentTasks = tasksData?.tasks ?? [];

  const totalTasks =
    (summary?.completedTasksCount ?? 0) +
    (summary?.inProgressTasksCount ?? 0) +
    (summary?.pendingTasksCount ?? 0);

  const completionPct = totalTasks > 0
    ? Math.round(((summary?.completedTasksCount ?? 0) / totalTasks) * 100)
    : 0;

  const activePct = totalTasks > 0
    ? Math.round(
        (((summary?.inProgressTasksCount ?? 0) + (summary?.pendingTasksCount ?? 0)) / totalTasks) * 100
      )
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-heading mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-text-secondary mb-8">
          Here&apos;s your summary for today
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
          <StatCard
            title="Tasks Worked On"
            value={isLoading ? "—" : (summary?.tasksWorkedOnCount ?? 0)}
            icon={FiList}
            tone="primary"
            isLoading={isLoading}
            sub="tasks touched today"
          />
          <StatCard
            title="Total Time Tracked"
            value={isLoading ? "—" : formatTotalDuration(summary?.totalTrackedSeconds ?? 0)}
            icon={FiClock}
            tone="info"
            isLoading={isLoading}
            sub="active tracking time"
          />
          <StatCard
            title="Completed Tasks"
            value={isLoading ? "—" : (summary?.completedTasksCount ?? 0)}
            icon={FiCheckCircle}
            tone="success"
            progress={completionPct}
            isLoading={isLoading}
            sub={`${completionPct}% of total`}
          />
          <StatCard
            title="In Progress / Pending"
            value={isLoading ? "—" : ((summary?.inProgressTasksCount ?? 0) + (summary?.pendingTasksCount ?? 0))}
            icon={FiLoader}
            tone="warning"
            progress={activePct}
            isLoading={isLoading}
            sub={`${summary?.inProgressTasksCount ?? 0} active · ${summary?.pendingTasksCount ?? 0} pending`}
          />
        </div>

        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-heading">Recent tasks</h2>
            <Link
              href="/dashboard/tasks"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
            >
              View all
              <FiArrowRightCircle className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <TaskList tasks={recentTasks} isLoading={isTasksLoading} limit={5} />
        </section>
      </div>
    </div>
  );
}
