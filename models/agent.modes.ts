import { Schema, model, models, Document } from "mongoose";

export interface IAgent extends Document {
    created_at: string;
    agent_id: string;
    api_key: string;
    device_info: {
        node_name: string;
        hostname: string;
        system: string;
        release: string;
        version: string;
        machine: string;
        processor: string;
        local_ip: string;
        public_ip: string;
    };
}

const InfoSchema = new Schema({
    node_name: String,
    hostname: String,
    system: String,
    release: String,
    version: String,
    machine: String,
    processor: String,
    local_ip: String,
    public_ip: String,
}, { _id: false });

const AgentSchema = new Schema({
    created_at: { type: String, required: true },
    agent_id: { type: String, required: true },
    api_key: { type: String, required: true },
    device_info: InfoSchema,
});

const Agent = models.Agent || model<IAgent>("Agent", AgentSchema);
export default Agent;