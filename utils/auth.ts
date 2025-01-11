import { jwtDecode } from "jwt-decode";

export type DecodedToken = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  api_key: string;
  exp: number; // Expiration time (in seconds)
};

export const getUserInfo = (): DecodedToken | null => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  console.log("auth getuserInfo token", token);
  if (!token) {
    return null;
  }

  try {
    const decoded: DecodedToken = jwtDecode(token);
    console.log("auth getuserInfo decoded", decoded);
    if (decoded.exp * 1000 < Date.now()) {
      return null;
    }

    return decoded; // Contains user info
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};
