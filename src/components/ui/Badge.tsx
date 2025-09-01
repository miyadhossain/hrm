"use client";
import clsx from "clsx";

export default function Badge({
  children,
  intent = "default",
}: {
  children: React.ReactNode;
  intent?: "default" | "success" | "warning" | "danger";
}) {
  const map = {
    default: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    success:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    warning:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
    danger: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  } as const;
  return (
    <span
      className={clsx(
        "px-2 py-1 rounded-full text-xs font-medium inline-flex items-center gap-x-2",
        map[intent]
      )}
    >
      {children}
    </span>
  );
}
