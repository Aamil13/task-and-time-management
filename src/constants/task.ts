import { BadgeTone } from "@/components/atoms/badge";
import type { TaskStatus } from "@/types/task";
import { FiCircle, FiClock, FiCheckCircle } from "react-icons/fi";

interface TaskStatusConfig {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  tone: BadgeTone;
}

export const TASK_STATUS_CONFIG: Record<TaskStatus, TaskStatusConfig> = {
  pending: { label: "Pending", icon: FiCircle, tone: "neutral" },
  in_progress: { label: "In Progress", icon: FiClock, tone: "info" },
  completed: { label: "Completed", icon: FiCheckCircle, tone: "success" },
};

/** Display order used by status pickers/menus. */
export const TASK_STATUS_ORDER: TaskStatus[] = ["pending", "in_progress", "completed"];