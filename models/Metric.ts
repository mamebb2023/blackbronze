import { Schema, Document, models, model } from "mongoose";

interface IMetric extends Document {
  cpu_usage: number;
  memory_usage: number;
  disk_usage: number;
  network_usage: {
    download: number;
    upload: number;
  };
  timestamp: Date;
  user_id: string;
  agent_id: string;
}

const MetricSchema = new Schema<IMetric>({
  cpu_usage: { type: Number, required: true },
  memory_usage: { type: Number, required: true },
  disk_usage: { type: Number, required: true },
  network_usage: {
    download: { type: Number, required: true },
    upload: { type: Number, required: true },
  },
  timestamp: { type: Date, default: Date.now },
  user_id: { type: String, required: true },
  agent_id: { type: String, required: true },
});

const Metric = models.Metric || model<IMetric>("Metric", MetricSchema);
export default Metric;
