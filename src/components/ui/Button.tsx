"use client";
import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

export default function Button({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={clsx(
        "px-4 py-2 rounded-xl bg-brand text-white shadow-soft hover:opacity-90 disabled:opacity-50 focus-ring",
        className
      )}
      {...props}
    />
  );
}
