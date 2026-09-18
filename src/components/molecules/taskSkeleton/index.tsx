/** Placeholder row shown while tasks are loading, matching TaskListItem's shape. */
export function TaskListItemSkeleton() {
  return (
    <li className="list-none" aria-hidden="true">
      <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm sm:gap-5 sm:p-5">
        <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-background-secondary" />
        <div className="min-w-[180px] flex-1 space-y-2">
          <div className="h-4 w-1/3 animate-pulse rounded bg-background-secondary" />
          <div className="h-3 w-1/4 animate-pulse rounded bg-background-secondary/50" />
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <div className="h-6 w-20 animate-pulse rounded-full bg-background-secondary/50" />
          <div className="h-8 w-8 animate-pulse rounded-md bg-background-secondary/50" />
        </div>
      </div>
    </li>
  );
}