
import { Badge } from "@/components/atoms/badge";
import { TASK_STATUS_CONFIG } from "@/constants/task";
import type { TaskStatus } from "@/types/task";

interface StatusBadgeProps {
  status: TaskStatus;
  className?: string;
}

/** Renders the color-coded, icon-labeled badge for a task's status. */
export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = TASK_STATUS_CONFIG[status];

  return (
    <Badge icon={config.icon} tone={config.tone} className={className}>
      {config.label}
    </Badge>
  );
}