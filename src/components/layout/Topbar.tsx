"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { logout } from "@/features/auth/authSlice";
import { toggleDark } from "@/features/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { Bell, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function Topbar() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.auth);
  const { dark } = useAppSelector((s) => s.ui);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onToggleDark = () => {
    dispatch(toggleDark());
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("dark", next ? "1" : "0");
  };

  return (
    <header className="h-16 sticky top-0 z-10 bg-white dark:bg-gray-900/70 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="container-xl h-full flex items-center justify-between gap-4">
        <div className="flex-1 max-w-lg">
          <Input placeholder="Search..." aria-label="Search" />
        </div>
        <div className="flex items-center gap-3">
          <button
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 focus-ring"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </button>
          <button
            onClick={onToggleDark}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 focus-ring"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          {mounted &&
            user && ( // ✅ only render after mount
              <div className="flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-gray-800">
                <img
                  src={user.avatar}
                  alt=""
                  className="h-8 w-8 rounded-full"
                />
                <div className="hidden sm:block leading-tight">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.role}</div>
                </div>
                <Button
                  onClick={() => {
                    dispatch(logout());
                    localStorage.removeItem("auth");
                    window.location.href = "/login";
                  }}
                  className="ml-2"
                >
                  Logout
                </Button>
              </div>
            )}
        </div>
      </div>
    </header>
  );
}
