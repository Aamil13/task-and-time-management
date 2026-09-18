"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { TaskLogsView } from "@/components/organisms/TaskLogView";
import { AllLogsView } from "@/components/organisms/allLogsView";

function TrackingContent() {
  const searchParams = useSearchParams();
  const taskId = searchParams.get("taskId");

  return taskId ? <TaskLogsView taskId={taskId} /> : <AllLogsView />;
}

export default function TrackingPage() {
  return (
    <Suspense>
      <TrackingContent />
    </Suspense>
  );
}
