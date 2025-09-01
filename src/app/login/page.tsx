"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { setAuth } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/lib/store";
import { useLoginMutation } from "@/services/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState(false);
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!email || !password) return;
    const res = await login({ email, password }).unwrap();
    dispatch(setAuth(res));
    localStorage.setItem("auth", JSON.stringify(res));
    router.replace("/dashboard");
  };

  const emailErr = touched && !email ? "Email required" : "";
  const passErr = touched && !password ? "Password required" : "";

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-soft space-y-4"
      >
        <h1 className="text-2xl font-semibold">Login</h1>
        <div>
          <label className="text-sm">Email</label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailErr && <p className="text-sm text-red-600 mt-1">{emailErr}</p>}
        </div>
        <div>
          <label className="text-sm">Password</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passErr && <p className="text-sm text-red-600 mt-1">{passErr}</p>}
        </div>
        {error && <p className="text-sm text-red-600">Login failed.</p>}
        <Button disabled={isLoading} type="submit">
          {isLoading ? "Signing in…" : "Sign in"}
        </Button>
        <p className="text-xs text-gray-500">Use any non-empty values.</p>
      </form>
    </div>
  );
}
