import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User, { IUser } from "@/models/User";
import { connectToDatabase } from "@/utils/database";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password }: { email: string; password: string, rememberMe: boolean } =
    await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Invalid Inputs" }, // No email or password
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();

    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" }, // User not found
        { status: 401 }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { error: "Invalid credentials" }, // Invalid password
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "3d" }
    );

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}
