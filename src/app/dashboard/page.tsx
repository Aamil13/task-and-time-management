"use client";

import { useStore } from "@/store";
import { MOCK_TASKS } from "@/constants/mockData";
import { TaskList } from "@/components/organisms/taskList";
import Link from "next/link";
import { FiArrowRightCircle } from "react-icons/fi";

export default function DashboardPage() {
  const user = useStore((state) => state.user);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-heading mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-text-secondary mb-8">
          Here's your productivity dashboard
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card p-6 rounded-lg border border-border">
            <h2 className="text-lg font-semibold text-heading mb-2">
              Total Tasks
            </h2>
            <p className="text-3xl font-bold text-primary">0</p>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border">
            <h2 className="text-lg font-semibold text-heading mb-2">
              Completed Today
            </h2>
            <p className="text-3xl font-bold text-success">0</p>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border">
            <h2 className="text-lg font-semibold text-heading mb-2">
              Time Tracked
            </h2>
            <p className="text-3xl font-bold text-info">0h 0m</p>
          </div>
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
        <TaskList tasks={MOCK_TASKS} limit={5} />
      </section>

      </div>
    </div>
  );
}
