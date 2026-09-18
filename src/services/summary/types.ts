export interface DailySummary {
  date: string;
  totalTrackedSeconds: number;
  tasksWorkedOnCount: number;
  completedTasksCount: number;
  inProgressTasksCount: number;
  pendingTasksCount: number;
}

export interface DailySummaryResponse {
  summary: DailySummary;
}
