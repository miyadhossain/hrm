"use client";
import Badge from "@/components/ui/Badge";
import { Search } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

export type AttendanceRow = {
  id: string;
  employeeId: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  role: string;
  reimbursement: number;
  status: "On-Time" | "Sick Leave" | "Late";
};

export default function AttendanceTable({
  rows,
}: {
  rows: AttendanceRow[];
  devMode?: boolean;
}) {
  const [sortKey, setSortKey] = useState<keyof AttendanceRow | "">("");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<"late" | "day-off">("late");

  const filtered = useMemo(() => {
    let list = rows;
    if (q) {
      const qq = q.toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(qq) ||
          r.email.toLowerCase().includes(qq)
      );
    }
    if (sortKey) {
      list = [...list].sort((a: any, b: any) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
    }
    return list;
  }, [rows, q, sortKey, sortDir]);

  const onSort = (key: keyof AttendanceRow) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-semibold">Employee Attendance</h2>
        <div className="flex items-center gap-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#FAFAFB]"
            />
            <span className="absolute left-3 top-2">
              <Search />
            </span>
          </div>
          <div className="flex items-center justify-between w-48 bg-[#FAFAFB] rounded-md p-1 cursor-pointer text-sm">
            <span
              onClick={() => setStatus("late")}
              className={`flex-1 text-center px-4 py-2 rounded-md transition-colors duration-300 ${
                status === "late" ? "bg-white text-black" : "text-[#8C8CA1]"
              }`}
            >
              Late
            </span>
            <span
              onClick={() => setStatus("day-off")}
              className={`flex-1 text-center px-4 py-2 rounded-md transition-colors duration-300 ${
                status === "day-off" ? "bg-white text-black" : "text-[#8C8CA1]"
              }`}
            >
              Day-off
            </span>
          </div>
        </div>
      </div>
      <div className="overflow-auto rounded-xl border border-gray-200 dark:border-gray-800">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800/50">
            <tr>
              <th className="px-3 py-2 w-8">
                <input type="checkbox" aria-label="Select all" />
              </th>
              <Header onClick={() => onSort("employeeId")}>Employee ID</Header>
              <Header onClick={() => onSort("name")}>Name</Header>
              <Header onClick={() => onSort("email")}>Email</Header>
              <Header onClick={() => onSort("phone")}>Phone</Header>
              <Header onClick={() => onSort("role")}>Role</Header>
              <Header onClick={() => onSort("reimbursement")}>
                Reimbursement
              </Header>
              <Header onClick={() => onSort("status")}>Attendance</Header>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-10">
                  No results.
                </td>
              </tr>
            ) : (
              filtered.map((r) => (
                <tr
                  key={r.id}
                  className="border-t border-gray-100 dark:border-gray-800"
                >
                  <td className="px-3 py-2">
                    <input type="checkbox" aria-label={`Select ${r.name}`} />
                  </td>
                  <td className="px-3 py-2">{r.employeeId}</td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <Image
                        width={32}
                        height={32}
                        src={r.avatar}
                        alt="avatar"
                        className="rounded-full"
                      />
                      <div>{r.name}</div>
                    </div>
                  </td>
                  <td className="px-3 py-2">{r.email}</td>
                  <td className="px-3 py-2">{r.phone}</td>
                  <td className="px-3 py-2">{r.role}</td>
                  <td className="px-3 py-2">
                    ${r.reimbursement.toLocaleString()}
                  </td>
                  <td className="px-3 py-2">
                    <Badge
                      intent={
                        r.status === "On-Time"
                          ? "success"
                          : r.status === "Late"
                          ? "warning"
                          : "danger"
                      }
                    >
                      {r.status}
                    </Badge>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Header({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <th
      onClick={onClick}
      className="px-3 py-2 text-left font-medium cursor-pointer select-none"
    >
      {children}
    </th>
  );
}
