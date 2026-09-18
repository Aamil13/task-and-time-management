"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiClipboard } from "react-icons/fi";
import { TaskListItem } from "@/components/organisms/taskListItem/index";
import { TaskListItemSkeleton } from "@/components/molecules/taskSkeleton";
import { Modal } from "@/components/molecules/modal";
import { Button } from "@/components/atoms/button";
import { CreateTaskModal } from "@/components/organisms/createTaskModal";
import { useStore } from "@/store";
import { useCreateTask, useUpdateTask, useDeleteTask } from "@/services/task";
import type { Task, TaskStatus } from "@/types/task";
import { useStartTracking, useStopActiveTracking } from "@/services/time-log";

interface TaskListProps {
  tasks: Task[];
  /** Caps how many tasks render, e.g. 5 on the dashboard. Omit to show all. */
  limit?: number;
  isLoading?: boolean;
  /** Number of skeleton rows to show while loading, if `limit` isn't set. */
  skeletonCount?: number;
  emptyTitle?: string;
  emptyDescription?: string;
  /** Omit to render task titles as plain text (no task-detail route yet). */
  onOpenTask?: (taskId: string) => void;
  isCreateModalOpen?: boolean;
  onCreateModalClose?: () => void;
}

/**
 * Renders a task list, shared by the dashboard ("Recent tasks", limit=5) and
 * the full tasks page (no limit). Uses React Query for data management and mutations.
 */
export function TaskList({
  tasks,
  limit,
  isLoading = false,
  skeletonCount = 5,
  emptyTitle = "No tasks yet",
  emptyDescription = "Create your first task to start tracking your work.",
  onOpenTask,
  isCreateModalOpen = false,
  onCreateModalClose,
}: TaskListProps) {
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const activeTaskId = useStore((state) => state.activeTaskId);
  const startTracking = useStore((state) => state.startTracking);
  const stopTracking = useStore((state) => state.stopTracking);
  const router = useRouter();


  const {mutate: startTrackingMutation} =  useStartTracking()
const {mutate: stopTrackingMutation} = useStopActiveTracking()
  const createTaskMutation = useCreateTask();
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  function handleToggleTracking(taskId: string) {
    if (activeTaskId === taskId) {
      stopTracking();
      stopTrackingMutation()
    } else {
      startTracking(taskId);
      startTrackingMutation(taskId);
    }
  }

  function handleStatusChange(taskId: string, status: TaskStatus) {
    updateTaskMutation.mutate({ id: taskId, data: { status } });
    if (status === "completed" && activeTaskId === taskId) {
      handleToggleTracking(taskId);
    }
  }

  function handleDelete(taskId: string) {
    const target = tasks.find((task) => task.id === taskId);
    if (!target) return;
    setTaskToDelete(target);
  }

  function confirmDelete() {
    if (!taskToDelete) return;
    if (activeTaskId === taskToDelete.id) stopTracking();
    deleteTaskMutation.mutate(taskToDelete.id);
    setTaskToDelete(null);
  }

  function handleCreate(taskData: { title: string; description?: string; status?: TaskStatus }) {
    createTaskMutation.mutate(taskData);
    onCreateModalClose?.();
  }

  function handleEdit(taskId: string) {
    const target = tasks.find((task) => task.id === taskId);
    if (!target) return;
    setTaskToEdit(target);
  }

  function handleSeeLogs(taskId: string) {
    router.push(`/dashboard/tracking?taskId=${taskId}`);
  }

  function handleUpdate(updated: Task) {
    updateTaskMutation.mutate({ id: updated.id, data: { title: updated.title, description: updated.description, status: updated.status } });
    setTaskToEdit(null);
  }

  function handleFormModalClose() {
    setTaskToEdit(null);
    onCreateModalClose?.();
  }

  const visibleTasks = typeof limit === "number" ? tasks.slice(0, limit) : tasks;

  const listContent = (() => {
    if (isLoading) {
      return (
        <ul className="flex flex-col gap-3" aria-label="Loading tasks">
          {Array.from({ length: limit ?? skeletonCount }).map((_, index) => (
            <TaskListItemSkeleton key={index} />
          ))}
        </ul>
      );
    }

    if (visibleTasks.length === 0) {
      return (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border bg-background-secondary/70 px-6 py-12 text-center">
          <FiClipboard className="h-8 w-8 text-icon-muted" aria-hidden="true" />
          <p className="text-sm font-medium text-foreground">{emptyTitle}</p>
          <p className="text-sm text-text-secondary">{emptyDescription}</p>
        </div>
      );
    }

    return (
      <ul className="flex flex-col gap-3">
        {visibleTasks.map((task) => (
          <TaskListItem
            key={task.id}
            task={task}
            onToggleTracking={handleToggleTracking}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onOpenTask={onOpenTask}
            onSeeLogs={handleSeeLogs}
          />
        ))}
      </ul>
    );
  })();

  return (
    <>
      {listContent}

      <CreateTaskModal
        isOpen={isCreateModalOpen || taskToEdit !== null}
        onClose={handleFormModalClose}
        onCreate={handleCreate}
        task={taskToEdit}
        onUpdate={handleUpdate}
      />

      <Modal
        isOpen={taskToDelete !== null}
        onClose={() => setTaskToDelete(null)}
        title="Confirm Delete"
      >
        <div className="space-y-4">
          <p className="text-foreground">
            Are you sure you want to delete &ldquo;{taskToDelete?.title}&rdquo;? This
            can&rsquo;t be undone.
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setTaskToDelete(null)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={confirmDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}