import type { Task } from "@/types/task";

/**
 * TEMPORARY: stand-in for GET /tasks until services/task.service.ts and the
 * backend are wired up (Phase 5). Kept here so the TaskList/TaskListItem
 * components can be built and reviewed against realistic data first.
 */
const now = Date.now();
const hoursAgo = (hours: number) => new Date(now - hours * 60 * 60 * 1000).toISOString();
const daysFromNow = (days: number) => new Date(now + days * 24 * 60 * 60 * 1000).toISOString();

export const MOCK_TASKS: Task[] = [
  {
    id: "task-1",
    title: "Design onboarding flow for new workspaces",
    description: "Cover empty states, invite step, and first-task prompt.",
    status: "in_progress",
    dueDate: daysFromNow(0),
    createdAt: hoursAgo(30),
    totalTimeSeconds: 8_100,
    subtaskProgress: { completed: 3, total: 5 },
  },
  {
    id: "task-2",
    title: "Fix timezone bug in daily summary",
    description: "Totals are off by one hour for users west of UTC.",
    status: "pending",
    dueDate: daysFromNow(-1),
    createdAt: hoursAgo(50),
    totalTimeSeconds: 0,
  },
  {
    id: "task-3",
    title: "Write API contract for time-log endpoints",
    status: "in_progress",
    dueDate: daysFromNow(1),
    createdAt: hoursAgo(20),
    totalTimeSeconds: 5_400,
  },
  {
    id: "task-4",
    title: "Review pull request: auth middleware",
    description: "Double-check refresh-token rotation and cookie flags.",
    status: "completed",
    createdAt: hoursAgo(72),
    totalTimeSeconds: 2_700,
  },
  {
    id: "task-5",
    title: "Prep weekly productivity report for the team",
    dueDate: daysFromNow(3),
    status: "pending",
    createdAt: hoursAgo(5),
    totalTimeSeconds: 900,
  },
  {
    id: "task-6",
    title: "Migrate task list to virtualized rendering",
    description: "Needed once a workspace has 500+ tasks.",
    status: "pending",
    createdAt: hoursAgo(96),
    totalTimeSeconds: 0,
    subtaskProgress: { completed: 0, total: 4 },
  },
  {
    id: "task-7",
    title: "Set up error tracking for the API layer",
    status: "completed",
    createdAt: hoursAgo(120),
    totalTimeSeconds: 6_300,
  },
  {
    id: "task-8",
    title: "Draft empty-state copy for the tasks page",
    status: "pending",
    dueDate: daysFromNow(5),
    createdAt: hoursAgo(2),
    totalTimeSeconds: 0,
  },
];