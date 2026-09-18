import { AiFillThunderbolt } from "react-icons/ai";

/**
 * Compact brand mark shown at the top of the collapsed sidebar:
 * a gradient icon tile with the product initial beneath it.
 */
export function Logo() {
  return (
    <div className="flex flex-col items-center gap-1 pt-5">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-sm shadow-indigo-500/30">
        <AiFillThunderbolt className="h-4 w-4 text-white" strokeWidth={2.25} aria-hidden />
      </div>
      <span className="text-[10px] font-semibold tracking-wide text-gray-700">
        FLOW
      </span>
    </div>
  );
}