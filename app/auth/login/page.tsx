"use client";

import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import { useToast } from "@/hooks/use-toast";
import { verifyEmail, verifyPassword } from "@/utils/verification";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();

    let error = null;

    const validEmail = verifyEmail(email);
    const validPassword = verifyPassword(password);

    if (!validEmail.valid) {
      error = validEmail.error!;
    } else if (!validPassword.valid) {
      error = validPassword.error!;
    }

    if (error) {
      return toast({
        title: "Invalid Input",
        description: error,
        variant: "destructive",
      });
    }

    setDisabledBtn(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rememberMe, email, password }),
      });

      const data = await res.json();
      if (data.token) {
        toast({
          title: "Login Success",
          description: `Welcome, ${data.name}`,
          variant: "success",
        });
        localStorage.setItem("token", data.token);
        setDisabledBtn(false);
      } else {
        setDisabledBtn(false);

        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Failed to register. Please try again later.",
        variant: "destructive",
      });

      setDisabledBtn(false);

      return console.error(error);
    }
  };

  return (
    // <motion.div className="h-screen flex flex-col md:flex-row">
    <div
      // initial={{ opacity: 0, scale: 0.9 }}
      // animate={{ opacity: 1, scale: 1 }}
      className="h-screen flex flex-col md:flex-row"
    >
      <div
        className="w-full h-[90px] md:h-auto md:w-[30%] lg:w-[50%]"
        style={{
          background: `url("/images/bg-0.png") no-repeat center center/cover`,
        }}
      />
      <div className="flex-1 w-full md:w-[70%] lg:w-[50%] flex-center">
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
              <Button
                type="submit"
                className="h-[50px] w-[150px]"
                disabled={disabledBtn}
              >
                Login
              </Button>
            </div>
          </form>
          <div className="flex-center">
            <p>
              Don&apos;t have an account?{" "}
              <Link href="/auth/register" className="text-blue-500">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
