

export interface StartTrackingResponse {
  timeLog: TimeLog;
}

export interface StopActiveTrackingResponse {
  timeLog: TimeLog;
}

export interface GetActiveSessionResponse {
  timeLog: TimeLog | null;
}

export interface TaskTimeLogsResponse {
  timeLogs: TimeLog[];
}

export interface TaskTimeTotalResponse {
  total: any;
}



export interface GetLogsForUserParams {
  status?: TimeLogStatus;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
}

export interface GetLogsForUserResponse {
  timeLogs: TimeLog[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}


export type TimeLogStatus = "ACTIVE" | "COMPLETED";

export interface TimeLog {
  _id: string;
  taskId: string;
  userId: string;
  status: TimeLogStatus;
  startedAt: string;
  endedAt?: string;
  durationSeconds?: number;
  createdAt: string;
  updatedAt: string;
}