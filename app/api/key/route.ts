import { connectToDatabase } from "@/lib/mongodb";
import Key from "@/models/Key";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { user_id } = await req.json();
  if (!user_id) {
    return NextResponse.json(
      { error: "Unathorized" },
      { status: 401 }
    )
  }

  try {
    connectToDatabase();

    const user = await User.findOne({ _id: user_id });
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    const key = await Key.findOne({ user_id });
    if (!key) {
      const newKey = new Key({
        user_id,
        // api_key: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        api_key: "bb_api_key",
        agents: []
      });

      await newKey.save();
      return NextResponse.json(
        { message: "API key created" },
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        { error: "User Already has API key" },
        { status: 400 }
      )
    }

  }  catch (error) {
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    )
  }
}