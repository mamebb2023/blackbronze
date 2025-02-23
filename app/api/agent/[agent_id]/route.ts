import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Agent from "@/models/agent.model";
import jwt from "jsonwebtoken";
import { DecodedToken } from "@/utils/auth";
import User from "@/models/user.model";
import Metric from "@/models/metric.model";

// Using the `params` object and awaiting it
export async function GET(
  request: Request,
  params: PromiseLike<{ agent_id: string; }> | { agent_id: string; }
) {
  const { agent_id } = await params;

  const authHeader = request.headers.get("Authorization");
  const token = authHeader?.split("Bearer ")[1];

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

  try {
    await connectToDatabase();

    const user = await User.findOne({ email: decodedToken.email });
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" });
    }

    const agent = await Agent.findOne({ agent_id });
    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    const metric   = await Metric.findOne({ agent_id, user_id: user._id })

    return NextResponse.json({ agent, metric }, { status: 201 });
  } catch (error) {
    console.error("Error fetching agent:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
