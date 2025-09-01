"use client";
import clsx from "clsx";
import { InputHTMLAttributes } from "react";

export default function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={clsx(
        "w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus-ring",
        className
      )}
      {...props}
    />
  );
}
