import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Key from "@/models/key.model";
import Agent from "@/models/agent.modes";

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const data = await request.json();
    const { api_key, agent_id, device_info } = data;

    if (!api_key || !agent_id || !device_info) {
      return NextResponse.json(
        { error: "Invalid Request!" },
        { status: 400 }
      );
    }

    // Check if the key is valid
    const keyRecord = await Key.findOne({ api_key });
    if (!keyRecord) {
      return NextResponse.json({ error: "Invalid key." }, { status: 401 });
    }

    const existingAgent = await Agent.findOne({ agent_id });
    if (!existingAgent) {
      const newAgent = new Agent({
        created_at: new Date().toISOString(),
        agent_id,
        api_key,
        device_info,
      });

      await newAgent.save();
      return NextResponse.json({ message: "Agent registered" }, { status: 201 });
    } else {
      return NextResponse.json(
        { message: "Agent already registered" },
        { status: 201 }
      );
    }
    
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}
