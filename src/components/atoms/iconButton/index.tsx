import type { ButtonHTMLAttributes } from "react";
import type { IconType } from "react-icons";
import { cn } from "@/lib/utils";

interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  icon: IconType;
  label: string;
  iconClassName?: string;
}

export function IconButton({ icon: Icon, label, className, iconClassName, ...buttonProps }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40",
        className,
      )}
      {...buttonProps}
    >
      <Icon className={cn("h-4 w-4", iconClassName)} aria-hidden="true" />
    </button>
  );
}