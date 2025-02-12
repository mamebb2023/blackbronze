import { Schema, model, models, Document } from "mongoose";

// IAgent interface updated to use `any` for `device_info`
export interface IAgent extends Document {
  created_at: string;
  agent_id: string;
  api_key: string;
  device_info: unknown; // Allow any type for device_info
}

const AgentSchema = new Schema(
  {
    created_at: { type: String, required: true },
    agent_id: { type: String, required: true, unique: true },
    api_key: { type: String, required: true },
    device_info: { type: Schema.Types.Mixed, required: true }, // Use `Mixed` type for flexible data
  }
);

// Create and export the Agent model
const Agent = models.Agent || model<IAgent>("Agent", AgentSchema);
export default Agent;
