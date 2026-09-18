"use client";

import { useSearchParams } from "next/navigation";
import { TaskLogsView } from "@/components/organisms/TaskLogView";
import { AllLogsView } from "@/components/organisms/allLogsView";


export default function TrackingPage() {
  const searchParams = useSearchParams();
  const taskId = searchParams.get("taskId");

  return taskId ? <TaskLogsView taskId={taskId} /> : <AllLogsView />;
}
