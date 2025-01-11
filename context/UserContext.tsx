"use client";

import { DecodedToken, getUserInfo } from "@/utils/auth";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  user: DecodedToken | null;
  login: (rememberMe: boolean, token: string) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userInfo = getUserInfo();
    setUser(userInfo);
  }, []);

  const login = (rememberMe: boolean, token: string) => {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem("token", token);

    const userInfo = getUserInfo();
    setUser(userInfo);

    // router.push("/user/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setUser(null);
    router.push("/");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
