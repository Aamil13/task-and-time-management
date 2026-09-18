import type { TimerSlice, SliceCreator } from "../types";

/**
 * Holds the app-wide active time-tracking session so the dashboard and the
 * tasks page always agree on which single task (if any) is being tracked.
*
 * TEMPORARY (Phase 5 scaffolding): until the time-log service exists, this
 * store is the source of truth and `startedAt` is set from the browser clock.
 * In Phase 6 this becomes a thin client cache in front of the backend:
 *   - startTracking -> POST /time-logs/start, then store the backend's
 *     authoritative `startedAt` (not `new Date()`), per the timer
 *     architecture rule that the backend timestamp is the source of truth.
 *   - stopTracking  -> POST /time-logs/:id/stop, then invalidate the task
 *     and time-log queries so totals refresh from the server.
 *   - On app load, hydrate this store from GET /time-logs/active so an
 *     in-progress session survives a page refresh.
 */


export const createTimeSlice: SliceCreator<TimerSlice> = (set, get) => ({
  activeTaskId: null,
  startedAt: null,
  startTracking: (taskId) => set({ activeTaskId: taskId, startedAt: new Date().toISOString() }),
  stopTracking: () => set({ activeTaskId: null, startedAt: null }),
});