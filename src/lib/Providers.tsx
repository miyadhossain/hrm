"use client";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Restore dark mode
    document.documentElement.classList.toggle(
      "dark",
      localStorage.getItem("dark") === "1"
    );

    setMounted(true);
  }, []);

  if (!mounted) {
    // ⏳ Don’t render children until mounted → avoids hydration mismatch
    return null;
  }

  return <Provider store={store}>{children}</Provider>;
}
