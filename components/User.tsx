import { useUser } from "@/context/UserContext";
import React from "react";

const User = () => {
  const { user, logout } = useUser();

  return (
    <div className="flex items-center gap-2">
      Welcome, {user?.firstName}
      <div
        className="size-7 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-500 cursor-pointer"
        onClick={logout}
      >
        <i className="bx bx-log-out-circle" />
      </div>
    </div>
  );
};

export default User;
