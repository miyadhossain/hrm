import { NextResponse } from "next/server";

export async function GET() {
  const res = {
    totalEmployees: 128,
    jobView: 2450,
    jobApplied: 312,
    resigned: 6,
    trends: [
      { kpi: "totalEmployees", dir: "up", pct: 3.2 },
      { kpi: "jobView", dir: "up", pct: 5.6 },
      { kpi: "jobApplied", dir: "down", pct: 1.1 },
      { kpi: "resigned", dir: "down", pct: 0.4 },
    ]
  };
  return NextResponse.json(res);
}
