import { Schema, Document, model, models } from "mongoose";

// Define the interface for the Keys document
export interface IKey extends Document {
  user_id: string;
  api_key: string;
  agents: { agent_id: string; created_at: string }[];
}

// Define the schema for the Keys collection
const KeySchema: Schema = new Schema({
  user_id: { type: String, required: true },
  api_key: { type: String, required: true }, // Renamed from api_key to key
  agents: [
    {
      agent_id: { type: String, required: true }, // Unique agent ID
      created_at: { type: String, required: true }, // Timestamp for when the agent was registered
    },
  ],
});

const Key = models.Key || model<IKey>("Key", KeySchema); 

export default Key;
