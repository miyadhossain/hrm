"use client";
import { useMemo, useState } from "react";
import Badge from "@/components/ui/Badge";
import Input from "@/components/ui/Input";

export type AttendanceRow = {
  id: string;
  employeeId: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  role: string;
  reimbursement: number;
  status: 'On-Time'|'Sick Leave'|'Late';
};

export default function AttendanceTable({ rows, devMode = true }: { rows: AttendanceRow[], devMode?: boolean }) {
  const [sortKey, setSortKey] = useState<keyof AttendanceRow | "">("");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [q, setQ] = useState("");
  const [state, setState] = useState<"normal" | "loading" | "empty" | "error">("normal");

  const filtered = useMemo(() => {
    let list = rows;
    if (q) {
      const qq = q.toLowerCase();
      list = list.filter(r => r.name.toLowerCase().includes(qq) || r.email.toLowerCase().includes(qq));
    }
    if (sortKey) {
      list = [...list].sort((a: any, b: any) => {
        const av = a[sortKey]; const bv = b[sortKey];
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

  if (state === "loading") return <div className="p-6 text-center">Loading attendance…</div>;
  if (state === "error") return <div className="p-6 text-center text-red-500">Failed to load attendance.</div>;

  const display = state === "empty" ? [] : filtered;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <Input placeholder="Search name or email…" value={q} onChange={(e) => setQ(e.target.value)} className="max-w-sm" />
        {devMode && (
          <div className="text-sm flex items-center gap-2">
            Dev state:
            <select className="border rounded px-2 py-1" value={state} onChange={(e) => setState(e.target.value as any)}>
              <option value="normal">normal</option>
              <option value="loading">loading</option>
              <option value="empty">empty</option>
              <option value="error">error</option>
            </select>
          </div>
        )}
      </div>
      <div className="overflow-auto rounded-xl border border-gray-200 dark:border-gray-800">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800/50">
            <tr>
              <th className="px-3 py-2 w-8"><input type="checkbox" aria-label="Select all" /></th>
              <Header onClick={() => onSort('employeeId')}>Employee ID</Header>
              <Header onClick={() => onSort('name')}>Name</Header>
              <Header onClick={() => onSort('email')}>Email</Header>
              <Header onClick={() => onSort('phone')}>Phone</Header>
              <Header onClick={() => onSort('role')}>Role</Header>
              <Header onClick={() => onSort('reimbursement')}>Reimbursement</Header>
              <Header onClick={() => onSort('status')}>Attendance</Header>
            </tr>
          </thead>
          <tbody>
            {display.length === 0 ? (
              <tr><td colSpan={8} className="text-center py-10">No results.</td></tr>
            ) : display.map((r) => (
              <tr key={r.id} className="border-t border-gray-100 dark:border-gray-800">
                <td className="px-3 py-2"><input type="checkbox" aria-label={`Select ${r.name}`} /></td>
                <td className="px-3 py-2">{r.employeeId}</td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <img src={r.avatar} alt="" className="h-8 w-8 rounded-full" />
                    <div>{r.name}</div>
                  </div>
                </td>
                <td className="px-3 py-2">{r.email}</td>
                <td className="px-3 py-2">{r.phone}</td>
                <td className="px-3 py-2">{r.role}</td>
                <td className="px-3 py-2">${r.reimbursement.toLocaleString()}</td>
                <td className="px-3 py-2">
                  <Badge intent={r.status === "On-Time" ? "success" : r.status === "Late" ? "warning" : "danger"}>
                    {r.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Header({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) {
  return (
    <th onClick={onClick} className="px-3 py-2 text-left font-medium cursor-pointer select-none">
      {children}
    </th>
  );
}
