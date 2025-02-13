import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User, { IUser } from "@/models/user.model";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Key from "@/models/key.model";

export async function POST(req: Request) {
  const {
    email,
    password,
  }: { email: string; password: string; rememberMe: boolean } =
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

    const key = await Key.findOne({ user_id: user._id });

    const token = jwt.sign(
      {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        api_key: key.api_key,
      },
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
