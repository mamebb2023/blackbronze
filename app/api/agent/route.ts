import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { DecodedToken } from "@/utils/auth";
import Key from "@/models/key.model";
import Agent from "@/models/agent.modes";

// get the servers/agents id and the date of creation only
export async function GET(request: Request) {
  try {
    await connectToDatabase();

    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.split("Bearer ")[1];

    if (!token) {
      return NextResponse.json({ error: "Invalid Request!" }, { status: 401 });
    }

    let decodedToken: DecodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    } catch (error) {
      console.error("Error verifying the JWT token:", error);
      return NextResponse.json(
        { error: "Invalid or expired token." },
        { status: 401 }
      );
    }

    const key = await Key.findOne({
      user_id: decodedToken.id,
      api_key: decodedToken.api_key,
    });
    if (!key) {
      return NextResponse.json({ error: "Invalid Request!" }, { status: 401 });
    }

    const agents = await Agent.find({ api_key: key.api_key });

    return NextResponse.json({ agents });
  } catch (error) {
    console.error("Error processing the request:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: String(error) },
      { status: 500 }
    );
  }
}
