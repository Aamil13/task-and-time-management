import type { Task, TaskStatus } from "@/types/task";

export interface CreateTaskData {
  title: string;
  description?: string;
  status?: TaskStatus;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  status?: TaskStatus;
}

export interface TaskResponse {
  task: Task;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface TasksResponse {
  tasks: Task[];
  pagination: PaginationMeta;
}
