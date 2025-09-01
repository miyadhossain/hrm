"use client";
import Button from "@/components/ui/Button";
import { setAuth } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/lib/store";
import { useLoginMutation } from "@/services/api";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Password toggle handler
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

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
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white shadow-md max-w-md w-full space-y-8 p-10 rounded-xl z-10 border">
        <div className="flex flex-col justify-center items-center">
          <h2 className="mt-6 text-3xl font-bold text-black">
            <Image
              src="/images/Logo.png"
              width={137}
              height={49}
              alt="Betopia Logo"
            />
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please sign in to your account
          </p>
        </div>
        <form onSubmit={onSubmit} className="mt-8 space-y-6">
          <div>
            <label className="text-sm font-bold tracking-wide">Email</label>
            <input
              className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-brand"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Type Email"
            />
            {emailErr && (
              <p className="text-sm text-red-600 mt-1">{emailErr}</p>
            )}
          </div>
          <div className="mt-8 content-center">
            <label className="text-sm font-bold tracking-wide">Password</label>
            <div className="relative">
              <input
                className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-brand"
                type={passwordShown ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              {passErr && (
                <p className="text-sm text-red-600 mt-1">{passErr}</p>
              )}
              <div
                onClick={togglePassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {passwordShown ? <Eye size={20} /> : <EyeOff size={20} />}
              </div>
            </div>
          </div>
          <div>
            <Button
              disabled={isLoading}
              type="submit"
              className="w-full bg-brand mt-4 py-2 rounded-2xl text-white font-semibold mb-2 inline-flex justify-center items-center"
            >
              {isLoading ? "Signing in…" : "Sign in"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
