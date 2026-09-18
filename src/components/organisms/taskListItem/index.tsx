"use client";

import { FiCalendar, FiFileText } from "react-icons/fi";

import { formatDueDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useStore } from "@/store";
import type { Task, TaskStatus } from "@/types/task";
import { TaskTimerToggle } from "@/components/molecules/taskTimerToggle";
import { ProgressBar } from "@/components/atoms/progressBar";
import { StatusBadge } from "@/components/molecules/statusBadge";
import { TaskMenu } from "@/components/molecules/taskMenu";

interface TaskListItemProps {
  task: Task;
  onToggleTracking: (taskId: string) => void;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
  onEdit?: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
  /** Omit to render the title as plain text (no task-detail route yet). */
  onOpenTask?: (taskId: string) => void;
  /** Omit to hide the "See logs" menu item. */
  onSeeLogs?: (taskId: string) => void;
}

/**
 * A single task row used both on the dashboard (limited list) and the full
 * tasks page. Reads the shared timer store directly so every instance of
 * this component agrees on which one task, if any, is being tracked.
 */
export function TaskListItem({ task, onToggleTracking, onStatusChange, onEdit, onDelete, onOpenTask, onSeeLogs }: TaskListItemProps) {
  const activeTaskId = useStore((state) => state.activeTaskId);
  const startedAt = useStore((state) => state.startedAt);
  const isActive = activeTaskId === task.id;
  const dueMeta = task.dueDate ? formatDueDate(task.dueDate) : null;

  return (
    <li className="list-none">
      <div
        className={cn(
          "flex flex-wrap items-center gap-4 rounded-2xl border bg-card p-4 shadow-sm transition-shadow hover:shadow-md sm:gap-5 sm:p-5",
          isActive ? "border-primary ring-1 ring-primary/20" : "border-border",
        )}
      >
        <TaskTimerToggle
          isActive={isActive}
          startedAt={isActive ? startedAt : null}
          totalTimeSeconds={task.totalTimeSeconds}
          onToggle={() => onToggleTracking(task.id)}
        />

        <div className="min-w-[180px] flex-1">
          {onOpenTask ? (
            <button
              type="button"
              onClick={() => onOpenTask(task.id)}
              className="block max-w-full truncate text-left text-sm font-semibold text-heading hover:text-primary sm:text-base"
            >
              {task.title}
            </button>
          ) : (
            <p className="block max-w-full truncate text-sm font-semibold text-heading sm:text-base">
              {task.title}
            </p>
          )}

          {(dueMeta || task.description) && (
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-secondary">
              {dueMeta && (
                <span
                  className={cn(
                    "inline-flex items-center gap-1",
                    dueMeta.tone === "danger" && "text-rose-600",
                    dueMeta.tone === "warning" && "text-amber-600",
                  )}
                >
                  <FiCalendar className="h-3.5 w-3.5" aria-hidden="true" />
                  {dueMeta.label}
                </span>
              )}
              {task.description && (
                <span className="inline-flex min-w-0 items-center gap-1">
                  <FiFileText className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span className="truncate">{task.description}</span>
                </span>
              )}
            </div>
          )}

          {task.subtaskProgress && task.subtaskProgress.total > 0 && (
            <div className="mt-2.5 flex max-w-xs items-center gap-2">
              <ProgressBar
                value={(task.subtaskProgress.completed / task.subtaskProgress.total) * 100}
                aria-label={`${task.subtaskProgress.completed} of ${task.subtaskProgress.total} subtasks complete`}
                className="flex-1"
              />
              <span className="shrink-0 text-xs font-medium text-text-secondary">
                {task.subtaskProgress.completed}/{task.subtaskProgress.total}
              </span>
            </div>
          )}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <StatusBadge status={task.status} />
          <TaskMenu
            currentStatus={task.status}
            onStatusChange={(status) => onStatusChange(task.id, status)}
            onEdit={onEdit ? () => onEdit(task.id) : undefined}
            onDelete={onDelete ? () => onDelete(task.id) : undefined}
            onSeeLogs={onSeeLogs ? () => onSeeLogs(task.id) : undefined}
          />
        </div>
      </div>
    </li>
  );
}