import type { AxiosResponse } from "axios";



import type {
  GetActiveSessionResponse,
  GetLogsForUserParams,
  GetLogsForUserResponse,
  StartTrackingResponse,
  StopActiveTrackingResponse,
  TaskTimeLogsResponse,
  TaskTimeTotalResponse,
} from "./types";
import client from "../api-client";

// POST /tasks/:taskId/time-logs/start
export async function startTracking(
  taskId: string
): Promise<AxiosResponse<StartTrackingResponse>> {
  return client.post<StartTrackingResponse>(
    `time-logs/tasks/${taskId}/time-logs/start`
  );
}

// GET /tasks/:taskId/time-logs
export async function getLogsForTask(
  taskId: string
): Promise<AxiosResponse<TaskTimeLogsResponse>> {
  return client.get<TaskTimeLogsResponse>(
    `/time-logs/tasks/${taskId}/time-logs`
  );
}

// GET /tasks/:taskId/time-logs/total
export async function getTaskTimeTotal(
  taskId: string
): Promise<AxiosResponse<TaskTimeTotalResponse>> {
  return client.get<TaskTimeTotalResponse>(
    `/time-logs/tasks/${taskId}/time-logs/total`
  );
}


export async function getUserAllTaskTimeTotal(
): Promise<AxiosResponse<TaskTimeTotalResponse>> {
  return client.get<TaskTimeTotalResponse>(
    `/time-logs/time-logs/total`
  );
}

// POST /time-logs/active/stop
export async function stopActiveTracking(): Promise<
  AxiosResponse<StopActiveTrackingResponse>
> {
  return client.post<StopActiveTrackingResponse>(
    "/time-logs/time-logs/active/stop"
  );
}

// GET /time-logs/active
export async function getActiveSession(): Promise<
  AxiosResponse<GetActiveSessionResponse>
> {
  return client.get<GetActiveSessionResponse>(
    "/time-logs/time-logs/active"
  );
}

// GET /time-logs
export async function getLogsForUser(
  params?: GetLogsForUserParams
): Promise<AxiosResponse<GetLogsForUserResponse>> {
  return client.get<GetLogsForUserResponse>("/time-logs/time-logs", {
    params,
  });
}