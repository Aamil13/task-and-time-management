"use client";

import { useState, type ReactNode } from "react";

interface TooltipProps {
  label: string;
  children: ReactNode;
}

/**
 * Minimal hover tooltip used for icon-only controls (e.g. the collapsed
 * sidebar). Renders to the right of the trigger with a small delay-free
 * fade so it reads as instant, precise feedback rather than an animation.
 */
export function Tooltip({ label, children }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      <span
        role="tooltip"
        className={`pointer-events-none absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2 whitespace-nowrap rounded-md bg-gray-900 px-2.5 py-1.5 text-xs font-medium text-white shadow-lg transition-opacity duration-100 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        {label}
        <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
      </span>
    </div>
  );
}