"use client";
import { SelectHTMLAttributes } from "react";
import clsx from "clsx";

export default function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={clsx(
        "w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus-ring",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}
