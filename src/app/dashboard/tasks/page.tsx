"use client";

import { useState } from "react";
import { FiPlus, FiChevronLeft, FiChevronRight } from "react-icons/fi";

import { TaskList } from "@/components/organisms/taskList";
import { Button } from "@/components/atoms/button";
import { useGetAllTasks } from "@/services/task";

const PAGE_SIZE = 4;

export default function TasksPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetAllTasks(page, PAGE_SIZE);
  const tasks = data?.tasks ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;

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
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="inline-flex items-center gap-1"
          >
            <FiChevronLeft className="h-4 w-4" aria-hidden="true" />
            Previous
          </Button>
          <span className="text-sm text-text-secondary">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="inline-flex items-center gap-1"
          >
            Next
            <FiChevronRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      )}
    </div>
  );
}
