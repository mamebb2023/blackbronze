import { Schema, Document, model, models } from "mongoose";

export interface IKey extends Document {
  user_id: string;
  api_key: string;
}

const KeySchema: Schema = new Schema({
  user_id: { type: String, required: true },
  api_key: { type: String, required: true },
});

const Key = models.Key || model<IKey>("Key", KeySchema);

export default Key;
