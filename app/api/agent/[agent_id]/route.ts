import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Agent from "@/models/agent.model";

// Using the `params` object and awaiting it
export async function GET(request: Request, { params }: { params: { agent_id: string } }) {
  const { agent_id } = await params;

  try {
    await connectToDatabase();
    const agent = await Agent.findOne({ agent_id });

    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    return NextResponse.json(agent);
  } catch (error) {
    console.error("Error fetching agent:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
