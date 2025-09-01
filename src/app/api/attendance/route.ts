import { NextResponse } from "next/server";

const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

export async function GET() {
  const roles = ["Engineer", "Designer", "Sales", "Marketer", "HR Generalist"];
  const statuses = ["On-Time", "Sick Leave", "Late"];
  const rows = Array.from({ length: 20 }).map((_, i) => ({
    id: String(i + 1),
    employeeId: "EMP" + String(1000 + i),
    name:
      [
        "Ava",
        "Ben",
        "Cara",
        "Dan",
        "Ella",
        "Finn",
        "Gina",
        "Hank",
        "Ivy",
        "Jack",
      ][i % 10] +
      " " +
      [
        "Kim",
        "Lee",
        "Patel",
        "Ali",
        "Ng",
        "Cruz",
        "Lopez",
        "Nova",
        "Chen",
        "Park",
      ][Math.floor(Math.random() * 10)],
    avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
    email: `user${i + 1}@example.com`,
    phone: "+1 555-01" + String(i).padStart(2, "0"),
    role: pick(roles),
    reimbursement: Math.floor(Math.random() * 900) + 100,
    status: pick(statuses),
  }));
  return NextResponse.json(rows);
}
