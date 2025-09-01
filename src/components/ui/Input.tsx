"use client";
import { InputHTMLAttributes } from "react";
import clsx from "clsx";

export default function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={clsx(
        "w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus-ring",
        className
      )}
      {...props}
    />
  );
}
