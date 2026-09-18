
export type TaskStatus = "pending" | "in_progress" | "completed";


export interface TaskSubtaskProgress {
  completed: number;
  total: number;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate?: string;
  createdAt: string;
  totalTimeSeconds: number;
  subtaskProgress?: TaskSubtaskProgress;
}