import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Key, { IKey } from "@/models/key.model";

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const data = await request.json();
    const { api_key, agent_id } = data;

    if (!api_key || !agent_id) {
      return NextResponse.json(
        { error: "API Key and Agent ID are required." },
        { status: 400 }
      );
    }

    // Check if the key is valid
    const keyRecord = await Key.findOne({ api_key });
    if (!keyRecord) {
      return NextResponse.json({ error: "Invalid key." }, { status: 401 });
    }

    // Check if the agent ID already exists
    const existingAgent = keyRecord.agents.find(
      (agent: IKey) => agent.agent_id === agent_id
    );
    if (existingAgent) {
      return NextResponse.json(
        { message: "Agent is already registered." },
        { status: 200 }
      );
    }

    // Add the new agent ID
    const newAgent = {
      agent_id,
      created_at: new Date().toISOString(),
    };
    keyRecord.agents.push(newAgent);
    await keyRecord.save();

    return NextResponse.json(
      { message: "Agent registered successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}
