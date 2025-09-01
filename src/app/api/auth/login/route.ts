import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: "Missing" }, { status: 400 });
  }
  return NextResponse.json({
    token: "mock-token-" + Math.random().toString(36).slice(2),
    user: {
      id: "u_" + Math.random().toString(36).slice(2,7),
      name: "Alex Johnson",
      role: "HR Manager",
      email,
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random()*70)+1}`
    }
  });
}
