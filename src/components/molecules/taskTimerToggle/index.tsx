"use client";

import { BsPlayBtn, BsSquare } from "react-icons/bs";
import { IconButton } from "@/components/atoms/iconButton";
import { useElapsedSeconds } from "@/hooks/use-elapseSeconds";
import { formatDuration, formatElapsedClock } from "@/lib/format";
import { cn } from "@/lib/utils";

interface TaskTimerToggleProps {
  isActive: boolean;
  /** Backend/store-provided start timestamp for the current session, if active. */
  startedAt: string | null;
  /** Time already logged for this task, excluding the current session. */
  totalTimeSeconds: number;
  onToggle: () => void;
  disabled?: boolean;
}

/**
 * Start/stop control for a task's timer. Shows the live elapsed time for the
 * running session (derived from `startedAt`, never a client-side counter)
 * when active, or the total time already logged when idle.
 */
export function TaskTimerToggle({ isActive, startedAt, totalTimeSeconds = 0, onToggle, disabled }: TaskTimerToggleProps) {
  const liveElapsedSeconds = useElapsedSeconds(isActive ? startedAt : null);

  return (
    <div className="flex shrink-0 flex-col items-center gap-1.5">
      <IconButton
        icon={isActive ? BsSquare : BsPlayBtn}
        label={isActive ? "Stop tracking time" : "Start tracking time"}
        onClick={onToggle}
        disabled={disabled}
        className={cn(
          "h-10 w-10 rounded-full text-white shadow-sm",
          isActive ? "bg-rose-500 hover:bg-rose-600" : "bg-indigo-600 hover:bg-indigo-700",
        )}
        iconClassName={isActive ? "h-3.5 w-3.5 fill-current" : "h-4 w-4 translate-x-px fill-current"}
      />
      <span
        className={cn("text-xs font-medium tabular-nums", isActive ? "text-error" : "text-text-secondary")}
        aria-live={isActive ? "polite" : undefined}
      >
        {isActive ? formatElapsedClock(liveElapsedSeconds) : formatDuration(totalTimeSeconds)}
      </span>
    </div>
  );
}