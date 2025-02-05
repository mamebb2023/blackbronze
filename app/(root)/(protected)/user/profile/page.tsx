"use client";

import Title from "@/components/Dashboard/Title";
import { useUser } from "@/context/UserContext";
import React from "react";

const Page = () => {
  const { user, logout } = useUser();

  return (
    <div>
      <Title title="Profile" bx_icon="bx bx-user" />
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-lg text-gray-500">Welcome, {user?.firstName}!</p>
        <button
          onClick={logout}
          className="mt-5 px-5 py-2 text-white bg-red-500 rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Page;
