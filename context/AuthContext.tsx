"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "@/utils/auth";

interface AuthContextType {
  token: string | null;
  user: DecodedToken | null;
  login: (token: string, rememberMe: boolean) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<DecodedToken | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        try {
          setUser(jwtDecode(storedToken));
        } catch (error) {
          console.error("Invalid token:", error);
          logout();
        }
      }
    }
  }, []);

  const login = (newToken: string, rememberMe: boolean) => {
    setToken(newToken);
    setUser(jwtDecode(newToken));

    if (typeof window !== "undefined") {
      if (rememberMe) {
        localStorage.setItem("token", newToken);
        sessionStorage.removeItem("token");
      } else {
        sessionStorage.setItem("token", newToken);
        localStorage.removeItem("token");
      }
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
    }
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
