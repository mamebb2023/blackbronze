"use client";

import Title from "@/components/Dashboard/Title";
import Button from "@/components/shared/Button";
import { useAuth } from "@/context/AuthContext";
import React from "react";

const Page = () => {
  const { user, logout } = useAuth();

  return (
    <div className="">
      <Title title="Profile" bx_icon="bx bx-user" />
      <div className="flex flex-col gap-2">
        {/* first name lastname and shit */}
        <div id="profile" className="bg-white p-3 rounded-md">
          <p>Firstname: {user?.firstName}</p>
          <p>Lastname: {user?.lastName}</p>
          <p>Email: {user?.email} </p>
        </div>

        {/* logout button */}
        <div
          id="danger_zone"
          className="bg-red-50 border-2 border-red-300 p-3 rounded-md"
        >
          <h6 className="h6 font-bold">Danger Zone</h6>
          <div className="flex justify-end items-center">
            <Button
              className="w-[110px] h-[40px] bg-red-500 border-red-500 hover:text-red-500"
              onClick={logout}
            >
              Log out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
