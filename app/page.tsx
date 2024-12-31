import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="flex flex-row justify-center items-center h-screen bg-gray-100">
      <Link href="/auth/login">Login</Link>{" "}
      <Link href="/auth/register">Register</Link>
    </div>
  );
};

export default Page;
