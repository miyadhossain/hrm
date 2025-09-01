"use client";
import clsx from "clsx";
import { SelectHTMLAttributes } from "react";

export default function Select({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={clsx(
        "w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus-ring",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}
