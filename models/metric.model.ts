import { Schema, Document, models, model } from "mongoose";

export interface IMetric extends Document {
  user_id: string;
  agent_id: string;
  metrics: {
    timestamp: Date;
    cpu_usage: number;
    memory_usage: number;
    disk_usage: number;
    network_usage: {
      download: number;
      upload: number;
    };
  }[];
}

const Metrics = new Schema(
  {
    timestamp: { type: Date, required: true },
    cpu_usage: { type: Number, required: true },
    memory_usage: { type: Number, required: true },
    disk_usage: { type: Number, required: true },
    network_usage: {
      download: { type: Number, required: true },
      upload: { type: Number, required: true },
    },
  },
  { _id: false },
)

const MetricSchema = new Schema<IMetric>({
  user_id: { type: String, required: true },
  agent_id: { type: String, required: true },
  metrics: [Metrics],
});

const Metric = models.Metric || model<IMetric>("Metric", MetricSchema);
export default Metric;
