"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/atoms/button";
import { InputBox } from "@/components/atoms/input-box";
import { InputWarningText } from "@/components/atoms/input-warning-text";
import { Modal } from "@/components/molecules/modal";
import { toDateInputValue } from "@/lib/format";
import { withInputLengthRules } from "@/lib/validation";
import type { Task, TaskStatus } from "@/types/task";

interface TaskFormValues {
  title: string;
  description: string;
  // dueDate: string;
}

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (taskData: { title: string; description?: string; status?: TaskStatus }) => void;
  /** When set, the modal updates this task instead of creating a new one. */
  task?: Task | null;
  onUpdate?: (task: Task) => void;
}

const emptyValues: TaskFormValues = { title: "", description: "" };

export function CreateTaskModal({ isOpen, onClose, onCreate, task, onUpdate }: CreateTaskModalProps) {
  const isEditing = Boolean(task);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>({
    defaultValues: emptyValues,
  });

  useEffect(() => {
    if (!isOpen) {
      reset(emptyValues);
      return;
    }

    if (task) {
      reset({
        title: task.title,
        description: task.description ?? "",
        // dueDate: toDateInputValue(task.dueDate),
      });
      return;
    }

    reset(emptyValues);
  }, [isOpen, task, reset]);

  const onSubmit = (data: TaskFormValues) => {
    const description = data.description.trim();
    // const dueDate = data.dueDate.trim();
    // const dueDateIso = dueDate ? new Date(`${dueDate}T00:00:00`).toISOString() : undefined;

    if (task && onUpdate) {
      onUpdate({
        ...task,
        title: data.title.trim(),
        description: description || undefined,
        // dueDate: dueDateIso,
      });
      onClose();
      return;
    }

    onCreate({
      title: data.title.trim(),
      description: description || undefined,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? "Edit Task" : "Create Task"}>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <InputBox
            label="Title"
            placeholder="What needs to get done?"
            {...register(
              "title",
              withInputLengthRules("title", {
                required: "Please enter a task title.",
                minLength: { value: 3, message: "Title must be at least 3 characters" },
              }),
            )}
            err={!!errors.title}
          />
          {errors.title && <InputWarningText>{errors.title.message}</InputWarningText>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="task-description" className="text-sm font-medium text-foreground">
            Description
          </label>
          <textarea
            id="task-description"
            rows={3}
            placeholder="Optional details"
            className="w-full resize-none rounded-lg border border-border-input bg-input px-4 py-2 text-foreground placeholder:text-foreground/50  focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
            {...register("description")}
          />
        </div>

        {/* <InputBox label="Due date" type="date" {...register("dueDate")} /> */}

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {isEditing ? "Save changes" : "Create task"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
