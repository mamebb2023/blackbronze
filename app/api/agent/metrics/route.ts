import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Metric from "@/models/metric.model";
import Key from "@/models/key.model";
import jwt from "jsonwebtoken";


export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const data = await request.json();

    const authHeader = request.headers.get("Authorization");
    const providedApiKey = authHeader?.split("Bearer ")[1]; // Extract the key after "Bearer "
    if (!providedApiKey) {
      return NextResponse.json(
        { error: "API key is required in the Authorization header." },
        { status: 401 }
      );
    }

    const key = await Key.findOne({ api_key: providedApiKey });
    if (!key) {
      return NextResponse.json({ error: "Invalid API key." }, { status: 401 });
    }

    console.log("Received metrics from agent:", data);

    const agentMetrics = await Metric.findOne({
      user_id: key.user_id,
      agent_id: data.agent_id,
    });
    if (!agentMetrics) {
      await Metric.create({
        user_id: key.user_id,
        agent_id: data.agent_id,
        metrics: [data],
      });
    } else {
      agentMetrics.metrics.push(data);
      await agentMetrics.save();
    }

    return NextResponse.json({
      message: "Metrics received and stored successfully.",
    });
  } catch (error) {
    console.error("Error processing the request:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: String(error) },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    await connectToDatabase();

    // Extract query parameters
    const { searchParams } = new URL(request.url);
    const start_date = searchParams.get("start_date"); // Optional: Start of time range
    const end_date = searchParams.get("end_date"); // Optional: End of time range

    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.split("Bearer ")[1]; // Extract the JWT token after "Bearer "

    if (!token) {
      return NextResponse.json(
        { error: "JWT token is required in the Authorization header." },
        { status: 401 }
      );
    }

    // Verify and decode the JWT token
    const query: { user_id?: string; "metrics.timestamp"?: { $gte?: string; $lte?: string } } = {};

    interface DecodedToken {
      id: string;
      // Add other properties if needed
    }

    let decodedToken: DecodedToken ;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    } catch (error) {
      console.error("Error verifying the JWT token:", error);
      return NextResponse.json({ error: "Invalid or expired token." }, { status: 401 });
    }

    console.log("decodedToken", decodedToken);

    query.user_id = decodedToken.id;
    // TODO: request the agents from the key model

    // const key = await Key.findOne({ user_id: decodedToken.id, api_key: decodedToken.api_key });
    // if (!key) {
    //   return NextResponse.json({ error: "Invalid" }, { status: 401 });
    // }

    if (start_date || end_date) {
      query["metrics.timestamp"] = {};
      if (start_date) query["metrics.timestamp"].$gte = new Date(start_date).toISOString();
      if (end_date) query["metrics.timestamp"].$lte = new Date(end_date).toISOString();
    }

    const metrics = await Metric.find(query);

return NextResponse.json({ metrics });
  } catch (error) {
    console.error("Error fetching metrics:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: String(error) },
      { status: 500 }
    );
  }
}



