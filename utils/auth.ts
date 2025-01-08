import { jwtDecode } from "jwt-decode";

export type DecodedToken = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  exp: number; // Expiration time (in seconds)
};

export const getUserInfo = (): DecodedToken | null => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token"); // or sessionStorage
  if (!token) {
    return null;
  }

  try {
    const decoded: DecodedToken = jwtDecode(token);
    // Optional: Check token expiration
    if (decoded.exp * 1000 < Date.now()) {
      console.error("Token has expired.");
      return null;
    }

    return decoded; // Contains user info (e.g., name, email)
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};
