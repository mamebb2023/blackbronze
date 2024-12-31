"use client";

import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import { useToast } from "@/hooks/use-toast";
import { verifyEmail, verifyName, verifyPassword } from "@/utils/verification";
import Link from "next/link";
import { useState } from "react";

export default function Register() {
  const { toast } = useToast();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);

  const register = async (e: React.FormEvent) => {
    e.preventDefault();

    const firstNameValidation = verifyName(firstName);
    if (!firstNameValidation.valid) {
      return toast({
        title: "Invalid Firstname",
        description: firstNameValidation.error!,
        variant: "destructive",
      });
    }

    const lastNameValidation = verifyName(lastName);
    if (!lastNameValidation.valid) {
      return toast({
        title: "Invalid Lastname",
        description: lastNameValidation.error!,
        variant: "destructive",
      });
    }

    const emailValidation = verifyEmail(email);
    if (!emailValidation.valid) {
      return toast({
        title: "Invalid Email",
        description: emailValidation.error!,
        variant: "destructive",
      });
    }

    const passwordValidation = verifyPassword(password);
    if (!passwordValidation.valid) {
      return toast({
        title: "Invalid Password",
        description: passwordValidation.error!,
        variant: "destructive",
      });
    }

    setDisabled(true);

    // All validations passed, proceed with API call
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast({
          title: "Registration Successful",
          description:
            "You have successfully registered. Please login to continue.",
          variant: "success",
        });
      } else {
        toast({
          title: "Registration Failed",
          description: data.error,
          variant: "destructive",
        });
        setDisabled(false);
      }
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Failed to register. Please try again later.",
        variant: "destructive",
      });
      return console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex-center">
      <div className="w-96 p-5 py-7 flex flex-col gap-5 border rounded-2xl">
        <div className="flex items-start">
          <h4 className="h4 font-bold gradient-underline">Register</h4>
        </div>

        <form onSubmit={register} className="flex flex-col gap-3">
          <div className="flex flex-col md:flex-row gap-1">
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
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex-center">
            <Button type="submit" disabled={disabled}>
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
      </div>
    </div>
  );
}
