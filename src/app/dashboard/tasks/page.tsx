"use client";

import { useState } from "react";
import { FiPlus } from "react-icons/fi";

import { TaskList } from "@/components/organisms/taskList";
import { Button } from "@/components/atoms/button";
import { useGetAllTasks } from "@/services/task";

export default function TasksPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { data: tasks = [], isLoading } = useGetAllTasks();
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 bg-background">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-heading">Tasks</h1>
          <p className="mt-1 text-sm text-text-secondary">Everything you&rsquo;re working on, in one place.</p>
        </div>
        <Button type="button" onClick={() => setIsCreateModalOpen(true)} className="inline-flex items-center gap-2">
          <FiPlus className="h-4 w-4" aria-hidden="true" />
          New task
        </Button>
      </div>
      <TaskList
        tasks={tasks}
        isLoading={isLoading}
        isCreateModalOpen={isCreateModalOpen}
        onCreateModalClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
