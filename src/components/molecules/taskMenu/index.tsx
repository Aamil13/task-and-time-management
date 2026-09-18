"use client";

import { useEffect, useRef, useState } from "react";
import { FiEdit2, FiMoreVertical, FiTrash2 } from "react-icons/fi";

import { TASK_STATUS_CONFIG, TASK_STATUS_ORDER } from "@/constants/task";
import type { TaskStatus } from "@/types/task";
import { IconButton } from "@/components/atoms/iconButton";

interface TaskMenuProps {
  currentStatus: TaskStatus;
  onStatusChange: (status: TaskStatus) => void;
  /** Omit to hide the "Edit task" action. */
  onEdit?: () => void;
  /** Omit to hide the "Delete task" action. */
  onDelete?: () => void;
}

/** Small accessible dropdown for per-task actions, opened from a kebab button. */
export function TaskMenu({ currentStatus, onStatusChange, onEdit, onDelete }: TaskMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const otherStatuses = TASK_STATUS_ORDER.filter((status) => status !== currentStatus);

  return (
    <div className="relative" ref={containerRef}>
      <IconButton
        icon={FiMoreVertical}
        label="Task actions"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="h-8 w-8 rounded-md text-icon-nav hover:bg-background-secondary hover:text-foreground"
      />
      {open && (
        <div
          role="menu"
          className="absolute right-0 z-20 mt-1 w-48 overflow-hidden rounded-lg border border-border bg-card py-1 shadow-lg"
        >
          {onEdit && (
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                onEdit();
                setOpen(false);
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-foreground hover:bg-background-secondary"
            >
              <FiEdit2 className="h-4 w-4" aria-hidden="true" />
              Edit task
            </button>
          )}

          <div className="px-3 pb-1 pt-2 text-[11px] font-medium uppercase tracking-wide text-text-muted">
            Move to
          </div>
          {otherStatuses.map((status) => {
            const config = TASK_STATUS_CONFIG[status];
            const StatusIcon = config.icon;
            return (
              <button
                key={status}
                type="button"
                role="menuitem"
                onClick={() => {
                  onStatusChange(status);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-foreground hover:bg-background-secondary"
              >
                <StatusIcon className="h-4 w-4" aria-hidden="true" />
                {config.label}
              </button>
            );
          })}

          {onDelete && (
            <>
              <div className="my-1 border-t border-border" />
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  onDelete();
                  setOpen(false);
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-error hover:bg-error/10"
              >
                <FiTrash2 className="h-4 w-4" aria-hidden="true" />
                Delete task
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}