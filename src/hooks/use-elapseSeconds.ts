"use client";

import { useEffect, useState } from "react";

function computeElapsed(startedAt: string | null): number {
  if (!startedAt) return 0;
  const diffMs = Date.now() - new Date(startedAt).getTime();
  return Math.max(0, Math.floor(diffMs / 1000));
}

/**
 * Returns the number of whole seconds elapsed since `startedAt`, re-derived
 * from the timestamp on every tick (elapsed = now - startedAt) rather than
 * incremented as a counter, so it self-corrects after tab throttling, sleep,
 * or a slow render and stays accurate on remount/refresh.
 */
export function useElapsedSeconds(startedAt: string | null): number {
  const [elapsed, setElapsed] = useState(() => computeElapsed(startedAt));

  useEffect(() => {
    const tick = () => setElapsed(computeElapsed(startedAt));

    // Defer the re-sync for the new `startedAt` to a macrotask instead of
    // calling setState synchronously in the effect body; the interval below
    // then keeps it ticking once a second.
    const resyncId = window.setTimeout(tick, 0);
    const intervalId = startedAt ? window.setInterval(tick, 1000) : undefined;

    return () => {
      window.clearTimeout(resyncId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [startedAt]);

  return elapsed;
}