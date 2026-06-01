import React from "react";

/**
 * Simple reusable spinner component.
 * Props:
 *  - size: Tailwind height/width classes (default "h-8 w-8")
 *  - color: Tailwind border color class (default "border-sky-500")
 */
export default function Spinner({ size = "h-8 w-8", color = "border-sky-500" }) {
  return (
    <div className="flex justify-center items-center" role="status" aria-label="loading">
      <div
        className={`${size} ${color} border-4 border-t-transparent rounded-full animate-spin`}
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
