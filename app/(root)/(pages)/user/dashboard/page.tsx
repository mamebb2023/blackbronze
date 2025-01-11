"use client";

import { useUser } from "@/context/UserContext";
import React from "react";

const Page = () => {
  const { user } = useUser();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>
        Welcome {user?.firstName} {user?.lastName}
      </p>
      <p>Email: {user?.email}</p>
      {/* apikey */}
      <p>API Key: {user?.api_key}</p>
    </div>
  );
};

export default Page;
