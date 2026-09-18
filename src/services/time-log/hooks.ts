import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getActiveSession,
  getLogsForTask,
  getLogsForUser,
  getTaskTimeTotal,
  getUserAllTaskTimeTotal,
  startTracking,
  stopActiveTracking,
} from "./api";

import type { GetLogsForUserParams } from "./types";

import { useCustomToast, getErrorMessage } from "@/lib/toast";

export const useStartTracking = () => {
  const { showPromise } = useCustomToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId: string) =>
      showPromise(startTracking(taskId), {
        loading: "Starting timer...",
        success: () => "Timer started successfully!",
        error: (err) => getErrorMessage(err),
      }),

    onSuccess: (_, taskId) => {
      queryClient.invalidateQueries({
        queryKey: ["time-logs", "active"],
      });

      queryClient.invalidateQueries({
        queryKey: ["time-logs", "task", taskId],
      });

      queryClient.invalidateQueries({
        queryKey: ["time-logs", "task", taskId, "total"],
      });
    },

    mutationKey: ["startTracking"],
  });
};

export const useStopActiveTracking = () => {
  const { showPromise } = useCustomToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      showPromise(stopActiveTracking(), {
        loading: "Stopping timer...",
        success: () => "Timer stopped successfully!",
        error: (err) => getErrorMessage(err),
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["time-logs", "active"],
      });

      queryClient.invalidateQueries({
        queryKey: ["time-logs"],
      });
    },

    mutationKey: ["stopActiveTracking"],
  });
};

export const useGetActiveSession = () => {
  return useQuery({
    queryKey: ["time-logs", "active"],
    queryFn: getActiveSession,
  });
};

export const useGetLogsForTask = (taskId: string) => {
  return useQuery({
    queryKey: ["time-logs", "task", taskId],
    queryFn: () => getLogsForTask(taskId),
    enabled: !!taskId,
  });
};

export const useGetTaskTimeTotal = (taskId: string) => {
  return useQuery({
    queryKey: ["time-logs", "task", taskId, "total"],
    queryFn: () => getTaskTimeTotal(taskId),
    enabled: !!taskId,
  });
};


export const useGetUserAllTaskTimeTotal = () => {
  return useQuery({
    queryKey: ["time-logs", "UserAlltask", "total"],
    queryFn: () => getUserAllTaskTimeTotal(),
   
  });
};

export const useGetLogsForUser = (
  params?: GetLogsForUserParams
) => {
  return useQuery({
    queryKey: ["time-logs", params],
    queryFn: () => getLogsForUser(params),
  });
};