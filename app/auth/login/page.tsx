"use client";

import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [token, setToken] = useState("");

  const login = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rememberMe, email, password }),
    });

    const data = await res.json();
    if (data.token) {
      setToken(data.token);
      localStorage.setItem("token", data.token);
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="min-h-screen flex-center">
      <div className="w-96 p-5 py-7 flex flex-col gap-5 border rounded-2xl">
        <div className="flex items-start">
          <h4 className="h4 font-bold gradient-underline">Login</h4>
        </div>
        <form onSubmit={login} className="flex flex-col gap-3">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex items-center justify-between text-xs">
            <div className="cursor-pointer flex-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe" className="ml-2">
                Login for 3 days
              </label>
            </div>
            <Link href="#" className="">
              Forgot password?
            </Link>
          </div>
          <div className="flex-center">
            <Button type="submit">Login</Button>
          </div>
        </form>
        {token && <p>Your JWT: {token}</p>}
        <div className="flex-center ">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="text-blue-500">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
