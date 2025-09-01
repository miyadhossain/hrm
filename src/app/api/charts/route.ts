import { NextResponse } from "next/server";

export async function GET() {
  const composition = [
    { label: "Female", value: 35 },
    { label: "Male", value: 65 },
  ];
  const sources = [
    { label: "Direct", value: 30 },
    { label: "WeWork", value: 35 },
    { label: "LinkedIn", value: 25 },
    { label: "Hired", value: 50 },
    { label: "Internal", value: 10 },
    { label: "Referral", value: 35 },
    { label: "Others", value: 20 },
  ];
  return NextResponse.json({ composition, sources });
}
