// Name verification function
export function verifyName(name: string): { valid: boolean; error?: string } {
  const nameRegex = /^[a-zA-Z]+$/;
  if (!nameRegex.test(name)) {
    return { valid: false, error: "Fullname is required" };
  }
  if (name.length < 2) {
    return {
      valid: false,
      error: "Name must be at least 2 characters long",
    };
  }
  if (name.length > 225) {
    return { valid: false, error: "Name must be 225 characters or less" };
  }
  return { valid: true };
}

// Email verification function
export function verifyEmail(email: string): { valid: boolean; error?: string } {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    return { valid: false, error: "Email is required" };
  }

  if (!emailRegex.test(email)) {
    return { valid: false, error: "Invalid email format" };
  }
  return { valid: true };
}

// Password verification function
export function verifyPassword(password: string): {
  valid: boolean;
  error?: string;
} {
  if (password.length < 8) {
    return {
      valid: false,
      error: "Password must be at least 8 characters long",
    };
  }
  return { valid: true };
}
