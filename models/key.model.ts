import { Schema, Document, model, models } from "mongoose";

export interface IKey extends Document {
  user_id: string;
  api_key: string;
  agents: { agent_id: string; created_at: string }[];
}

const Agents = new Schema(
  {
    agent_id: { type: String, required: true },
    created_at: { type: String, required: true },
  },
  { _id: false }
);

const KeySchema: Schema = new Schema({
  user_id: { type: String, required: true },
  api_key: { type: String, required: true },
  agents: [Agents],
});

const Key = models.Key || model<IKey>("Key", KeySchema);

export default Key;
