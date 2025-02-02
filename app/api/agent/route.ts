import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { DecodedToken } from "@/utils/auth";
import Key from "@/models/key.model";
import Agent from "@/models/agent.modes";
import Metric from "@/models/metric.model";

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

    const agents = await Agent.find({ api_key: key.api_key }).select(
      "agent_id created_at device_info"
    ).lean();
    const metrics = await Metric.find({
      api_key: key.api_key,
      agent_id: { $in: agents.map((agent) => agent.agent_id) },
    }).select("agent_id metrics").lean();

    const agentsWithMetrics = agents.map((agent) => {
      const agentMetrics = metrics.filter(
        (metric) => metric.agent_id === agent.agent_id
      );
      const latestMetric =
        agentMetrics.length > 0
          ? agentMetrics[agentMetrics.length - 1].metrics.slice(-1)[0]
          : null;

      return {
        agent_id: agent.agent_id,
        created_at: agent.created_at,
        device_info: agent.device_info,
        latest_metrics: latestMetric,
      };
    });

    console.log("Agents with metrics:", agentsWithMetrics);

    return NextResponse.json({ agents: agentsWithMetrics });
  } catch (error) {
    console.error("Error processing the request:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: String(error) },
      { status: 500 }
    );
  }
}
