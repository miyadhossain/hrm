"use client";
import { toggleDark } from "@/features/ui/uiSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { Bell, Moon, Search, Sun } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Topbar() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.auth);
  const { dark, title, subtitle } = useAppSelector((s) => s.ui);
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
    <header className="h-16 sticky top-0 z-10 bg-white dark:bg-gray-900/70 backdrop-blur">
      <div className="container-xl h-full flex items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl">{title}</h3>
          <p className="text-sm text-[#8C8CA1]">{subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute left-3 top-3">
                <Search />
              </span>
            </div>
          </div>
          <button
            className="rounded-xl bg-[#FAFAFB] dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 focus-ring w-[50px] h-[50px] flex justify-center items-center"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </button>
          <button
            onClick={onToggleDark}
            className="rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 focus-ring w-[50px] h-[50px] flex justify-center items-center"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          {mounted &&
            user && ( // only render after mount
              <div className="flex items-center gap-x-3 p-1 border border-gray-200 dark:border-gray-800 rounded-md">
                <Image
                  width={40}
                  height={40}
                  src={user.avatar}
                  alt="avatar"
                  className="rounded-md"
                />
                <div className="hidden sm:block leading-tight">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.role}</div>
                </div>
                {/* <Button
                  onClick={() => {
                    dispatch(logout());
                    localStorage.removeItem("auth");
                    window.location.href = "/login";
                  }}
                  className="ml-2"
                >
                  Logout
                </Button> */}
              </div>
            )}
        </div>
      </div>
    </header>
  );
}
