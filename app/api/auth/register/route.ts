import bcrypt from "bcryptjs";
import User, { IUser } from "@/models/User";
import { connectToDatabase } from "@/utils/database";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const {
    firstName,
    lastName,
    email,
    password,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  } = await req.json();

  if (!firstName || !lastName || !email || !password) {
    return NextResponse.json(
      { error: "Invalid inputs" },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: IUser = new User({ firstName, lastName, email, password: hashedPassword });
    await newUser.save();

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}
