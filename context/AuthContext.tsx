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
  const getStoredToken = () =>
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const [token, setToken] = useState<string | null>(getStoredToken);
  const [user, setUser] = useState<DecodedToken | null>(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error("Invalid token:", error);
        logout(); // If decoding fails, clear auth state
      }
    }
  }, [token]);

  const login = (newToken: string, rememberMe: boolean) => {
    try {
      setToken(newToken);

      const decoded: DecodedToken = jwtDecode(newToken);
      setUser(decoded);

      if (rememberMe) {
        localStorage.setItem("token", newToken);
        sessionStorage.removeItem("token");
      } else {
        sessionStorage.setItem("token", newToken);
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);

    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    window.location.href = "/";
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
