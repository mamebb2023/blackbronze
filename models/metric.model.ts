import { Schema, Document, models, model } from "mongoose";

export interface IMetric extends Document {
  user_id: string;
  agent_id: string;
  metrics: Array<unknown>;
}

const MetricSchema = new Schema<IMetric>({
  user_id: { type: String, required: true },
  agent_id: { type: String, required: true },
  metrics: { type: Schema.Types.Mixed, required: true },
});

const Metric = models.Metric || model<IMetric>("Metric", MetricSchema);
export default Metric;
