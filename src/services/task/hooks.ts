import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTask, getAllTasks, getTaskById, updateTask, deleteTask } from "./api";
import type { CreateTaskData, UpdateTaskData, PaginationMeta } from "./types";
import type { Task } from "@/types/task";
import { useCustomToast, getErrorMessage } from "@/lib/toast";

export const useCreateTask = () => {
  const { showPromise } = useCustomToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTaskData) =>
      showPromise(createTask(data), {
        loading: "Creating task...",
        success: () => "Task created successfully!",
        error: (err) => getErrorMessage(err),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    mutationKey: ["createTask"],
  });
};

export const useGetAllTasks = (page: number = 1, limit: number = 10) => {
  return useQuery<{ tasks: Task[]; pagination: PaginationMeta }>({
    queryKey: ["tasks", page, limit],
    queryFn: async () => {
      const res = await getAllTasks(page, limit);
      return {
        tasks: res.data?.tasks ?? [],
        pagination: res.data?.pagination,
      };
    },
  });
};

export const useGetTaskById = (id: string) => {
  return useQuery<Task>({
    queryKey: ["task", id],
    queryFn: async () => {
      const res:any = await getTaskById(id);
      const task = res?.data;
      if (!task) throw new Error(`Task ${id} not found`);
      return task;
    },
    enabled: !!id,
  });
};

export const useUpdateTask = () => {
  const { showPromise } = useCustomToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTaskData }) =>
      showPromise(updateTask(id, data), {
        loading: "Updating task...",
        success: () => "Task updated successfully!",
        error: (err) => getErrorMessage(err),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    mutationKey: ["updateTask"],
  });
};

export const useDeleteTask = () => {
  const { showPromise } = useCustomToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      showPromise(deleteTask(id), {
        loading: "Deleting task...",
        success: () => "Task deleted successfully!",
        error: (err) => getErrorMessage(err),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    mutationKey: ["deleteTask"],
  });
};
