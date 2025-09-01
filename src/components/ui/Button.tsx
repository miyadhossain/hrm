"use client";
import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

export default function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={clsx(
        "px-4 py-2 rounded-2xl bg-brand text-white shadow-soft hover:opacity-90 disabled:opacity-50 focus-ring",
        className
      )}
      {...props}
    />
  );
}
