import client from "../api-client";
import type { CreateTaskData, UpdateTaskData, TaskResponse, TasksResponse } from "./types";
import type { AxiosResponse } from "axios";

export async function createTask(data: CreateTaskData): Promise<AxiosResponse<TaskResponse>> {
  return client.post<TaskResponse>("/tasks", data);
}

export async function getAllTasks(): Promise<AxiosResponse<TasksResponse>> {
  return client.get<TasksResponse>("/tasks");
}

export async function getTaskById(id: string): Promise<AxiosResponse<TaskResponse>> {
  return client.get<TaskResponse>(`/tasks/${id}`);
}

export async function updateTask(id: string, data: UpdateTaskData): Promise<AxiosResponse<TaskResponse>> {
  return client.put<TaskResponse>(`/tasks/${id}`, data);
}

export async function deleteTask(id: string): Promise<AxiosResponse<void>> {
  return client.delete<void>(`/tasks/${id}`);
}
