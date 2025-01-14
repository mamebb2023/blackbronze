"use client";

import { useUser } from "@/context/UserContext";
import React from "react";

const Page = () => {
  const { user } = useUser();
  return (
    <div>
      {user?.firstName} {user?.lastName}
      <p>Email: {user?.email}</p>
      <p>API Key: {user?.api_key}</p>
    </div>
  );
};

export default Page;
