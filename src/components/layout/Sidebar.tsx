"use client";
import { logout } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/lib/store";
import clsx from "clsx";
import {
  BriefcaseBusiness,
  Building2,
  CalendarCheck2,
  Gift,
  HandCoins,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Settings,
  Star,
  Umbrella,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/employees", label: "Employees", icon: Users },
  { href: "/departments", label: "Departments", icon: Building2 },
  { href: "/attendance", label: "Attendance", icon: CalendarCheck2 },
  { href: "/payroll", label: "Payroll", icon: HandCoins },
  { href: "/recruitment", label: "Recruitment", icon: BriefcaseBusiness },
  { href: "/performance", label: "Performance", icon: Star },
  { href: "/leaves", label: "Leaves", icon: Umbrella },
  { href: "/holidays", label: "Holidays", icon: Gift },
];

export default function Sidebar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  return (
    <aside className="hidden md:flex sticky top-0 h-screen w-64 flex-col gap-2 p-4 dark:border-gray-800 bg-[#FAFAFB] dark:bg-gray-800 rounded-2xl">
      <div className="pb-4">
        <Image
          src="/images/Logo.png"
          width={137}
          height={49}
          alt="Betopia Logo"
        />
      </div>
      <nav className="flex-1 space-y-1">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href) && href !== "#";
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 text-sm",
                active &&
                  "text-brand bg-[#FFF2E8] dark:bg-gray-800 font-semibold"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <span>Other</span>
      <nav>
        <Link
          href="/"
          className={clsx(
            "flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
          )}
        >
          <LifeBuoy className="h-5 w-5" />
          <span>Support</span>
        </Link>
        <Link
          href="/"
          className={clsx(
            "flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
          )}
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Link>
        <span
          onClick={() => {
            dispatch(logout());
            localStorage.removeItem("auth");
            window.location.href = "/login";
          }}
          className={clsx(
            "flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-sm cursor-pointer text-red-600"
          )}
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </span>
      </nav>
    </aside>
  );
}
