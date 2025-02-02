import { connectToDatabase } from "@/lib/mongodb";
import Key from "@/models/key.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { user_id } = await req.json();
  if (!user_id) {
    return NextResponse.json({ error: "Unathorized" }, { status: 401 });
  }

  try {
    connectToDatabase();

    const user = await User.findOne({ _id: user_id });
    if (!user) {
      return NextResponse.json({ error: "Unathorized" }, { status: 401 });
    }

    const key = await Key.findOne({ user_id });
    if (!key) {
      // let newApiKey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      let newApiKey = "bb_api_key";
      // const keyExists = await Key.find({ api_key: newApiKey });
      // while (keyExists.length > 0) {
        // anotherKey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        // newApiKey = anotherKey
        newApiKey = "bb_api_key";
      // }

      const newKey = new Key({
        user_id,
        api_key: newApiKey,
      });

      await newKey.save();
      return NextResponse.json({ message: "API key created" }, { status: 201 });
    } else {
      return NextResponse.json(
        { error: "User Already has API key" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: `Internal Server Error` },
      { status: 500 }
    );
  }
}
