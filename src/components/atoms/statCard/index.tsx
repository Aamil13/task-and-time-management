import { cn } from "@/lib/utils";
import type { IconType } from "react-icons";

type Tone = "primary" | "success" | "info" | "warning";

const TONE: Record<
  Tone,
  { icon: string; value: string; pill: string; bar: string }
> = {
  primary: {
    icon: "bg-primary/10 text-primary",
    value: "text-primary",
    pill: "bg-primary/10 text-primary",
    bar: "bg-primary",
  },
  success: {
    icon: "bg-success/10 text-success",
    value: "text-success",
    pill: "bg-success/10 text-success",
    bar: "bg-success",
  },
  info: {
    icon: "bg-info/10 text-info",
    value: "text-info",
    pill: "bg-info/10 text-info",
    bar: "bg-info",
  },
  warning: {
    icon: "bg-warning/10 text-warning",
    value: "text-warning",
    pill: "bg-warning/10 text-warning",
    bar: "bg-warning",
  },
};

interface StatCardProps {
  title: string;
  value: string | number;
  icon: IconType;
  tone?: Tone;
  /** 0–100, renders a thin progress bar at the bottom when provided */
  progress?: number;
  /** Small label shown below the value */
  sub?: string;
  isLoading?: boolean;
  className?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  tone = "primary",
  progress,
  sub,
  isLoading = false,
  className,
}: StatCardProps) {
  const t = TONE[tone];

  return (
    <div
      className={cn(
        "relative flex flex-col gap-4 rounded-xl border border-border bg-card p-5 overflow-hidden",
        className
      )}
    >
      {/* header row */}
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-text-secondary leading-snug">
          {title}
        </p>
        <span className={cn("flex-shrink-0 rounded-lg p-2", t.icon)}>
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>

      {/* value */}
      {isLoading ? (
        <div className="h-8 w-20 animate-pulse rounded-md bg-background-secondary" />
      ) : (
        <div className="flex flex-col gap-0.5">
          <span className={cn("text-3xl font-bold leading-none", t.value)}>
            {value}
          </span>
          {sub && (
            <span className="text-xs text-text-muted">{sub}</span>
          )}
        </div>
      )}

      {/* optional progress bar */}
      {progress !== undefined && (
        <div className="h-1 w-full overflow-hidden rounded-full bg-background-secondary">
          <div
            className={cn("h-full rounded-full transition-[width] duration-500", t.bar)}
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      )}
    </div>
  );
}
