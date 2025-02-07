import { getToken } from "@/lib/utils";
import { jwtDecode } from "jwt-decode";

export type DecodedToken = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  api_key: string;
  exp: number;
};

export const getUserInfo = (): DecodedToken | null => {
  const token = getToken();
  if (!token) {
    return null;
  }

  try {
    const decoded: DecodedToken = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      sessionStorage.removeItem("token");
      localStorage.removeItem("token");
      return null;
    }

    return decoded; // Contains user info
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};
