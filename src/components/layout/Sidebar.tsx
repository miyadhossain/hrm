"use client";
import clsx from "clsx";
import {
  BarChart2,
  BriefcaseBusiness,
  Building2,
  CalendarCheck2,
  Gift,
  HandCoins,
  LayoutDashboard,
  LifeBuoy,
  Settings,
  Star,
  Umbrella,
  Users,
} from "lucide-react";
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
  { href: "/support", label: "Support", icon: LifeBuoy },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden md:flex sticky top-0 h-screen w-64 flex-col gap-2 p-4 border-r border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-2 text-xl font-semibold pb-4">
        <BarChart2 className="h-6 w-6 text-brand" />
        AMAR Pos
      </div>
      <nav className="flex-1 space-y-1">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href) && href !== "#";
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800",
                active &&
                  "text-[#F69348] bg-[#FFF2E8] dark:bg-gray-800 font-semibold"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="text-xs text-gray-500">© {new Date().getFullYear()}</div>
    </aside>
  );
}
