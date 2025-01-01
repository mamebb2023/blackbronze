import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User, { IUser } from "@/models/User";
import { connectToDatabase } from "@/utils/database";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password, rememberMe }: { email: string; password: string, rememberMe: boolean } =
    await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();

    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: rememberMe ? "3d" : "5h" }
    );

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}
