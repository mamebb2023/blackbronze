import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Metric from "@/models/Metric";
import Key from "@/models/Key";

export async function POST(request: Request) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Parse the incoming request body
    const data = await request.json();

    // Extract the API key from the Authorization header
    const authHeader = request.headers.get("Authorization");
    const providedApiKey = authHeader?.split("Bearer ")[1]; // Extract the key after "Bearer "

    // Validate the presence of the API key
    if (!providedApiKey) {
      return NextResponse.json(
        { error: "API key is required in the Authorization header." },
        { status: 401 }
      );
    }

    // // Fetch the user with the provided API key from the database
    const key = await Key.findOne({ api_key: providedApiKey });

    // If no user is found, the API key is invalid
    if (!key) {
      return NextResponse.json({ error: "Invalid API key." }, { status: 401 });
    }

    // Log the received metrics data (for debugging purposes)
    console.log("Received metrics from agent:", data);

    // Store the received metrics data in the database
    const newMetric = new Metric({
      ...data,
      user_id: key.user_id,
      agent_id: data.agent_id,
    }); // Associate the metrics with the user
    await newMetric.save();

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
