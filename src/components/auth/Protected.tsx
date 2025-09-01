"use client";
import { useAppSelector } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "../layout/Sidebar";
import Topbar from "../layout/Topbar";

export default function Protected({ children }: { children: React.ReactNode }) {
  const { token } = useAppSelector((s) => s.auth);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // ensure client-side only
  }, []);

  useEffect(() => {
    if (mounted && !token) {
      router.replace("/login");
    }
  }, [mounted, token, router]);

  if (!mounted) return null; // avoid hydration flicker

  if (!token) return null;
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
