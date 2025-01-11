"use client";

import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import { useToast } from "@/hooks/use-toast";
import { verifyEmail, verifyName, verifyPassword } from "@/utils/verification";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Register() {
  const { toast } = useToast();
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  const [viewPwd, setViewPwd] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(false);

  const register = async (e: React.FormEvent) => {
    e.preventDefault();

    let error = null;

    const validFirstName = verifyName(firstName);
    const validLastName = verifyName(lastName);
    const validEmail = verifyEmail(email);
    const validPassword = verifyPassword(password);

    if (!validFirstName.valid) {
      error = validFirstName.error!;
    } else if (!validLastName.valid) {
      error = validLastName.error!;
    } else if (!validEmail.valid) {
      error = validEmail.error!;
    } else if (!validPassword.valid) {
      error = validPassword.error!;
    } else if (password !== confirmPwd) {
      error = "Passwords don't match";
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
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (!res.ok) {
        const { error: errorMessage } = await res.json();
        throw new Error(errorMessage || "An unknown error occurred");
      }

      toast({
        title: "Registration Successful",
        description:
          "You have successfully registered. Please login to continue.",
        variant: "success",
      });

      router.push("/auth/login");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      toast({
        title: "Registration Failed",
        description: errorMessage,
        variant: "destructive",
      });

      console.error(error);
    } finally {
      // Ensure the button is always re-enabled
      setDisabledBtn(false);
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row">
      <div
        className="w-full h-[90px] md:h-auto md:w-[30%] lg:w-[50%]"
        style={{
          background: `url("/images/bg-0.png") no-repeat center center/cover`,
        }}
      />
      <div className="flex-1 w-full md:w-[70%] lg:w-[50%] flex-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-96 p-5 py-7 flex flex-col gap-5 border rounded-2xl"
        >
          <div className="flex items-start">
            <h4 className="h4 font-bold gradient-underline">Register</h4>
          </div>
          <form onSubmit={register} className="flex flex-col gap-3">
            <div className="flex flex-col md:flex-row gap-3">
              <Input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex items-center gap-2">
              <Input
                type={viewPwd ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="size-10 flex-center cursor-pointer text-2xl active:scale-95 text-green-950"
                onClick={() => setViewPwd(!viewPwd)}
              >
                {viewPwd ? (
                  <i className="bx bx-show" />
                ) : (
                  <i className="bx bx-hide" />
                )}
              </div>
            </div>
            <Input
              type={viewPwd ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPwd}
              onChange={(e) => setConfirmPwd(e.target.value)}
            />
            <div className="flex-center">
              <Button
                type="submit"
                className="h-[50px] w-[150px]"
                disabled={disabledBtn}
              >
                Register
              </Button>
            </div>
          </form>
          <div className="flex-center">
            <p>
              Already have an account?{" "}
              <Link href="/auth/login" className="text-blue-500">
                Login
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
