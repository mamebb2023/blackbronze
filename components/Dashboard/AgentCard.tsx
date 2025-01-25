import { IKey } from "@/models/key.model";
import Link from "next/link";
import React from "react";

interface Props {
  agent: IKey["agents"][0];
}

const AgentCard = ({ agent }: Props) => {
  return (
    <div className="agent-card flex-col p-2 absolute w-[300px] hidden opacity-0 bg-white rounded-md transition-all">
      <div className="flex justify-between text-xs">
        <span className="text-gray-500/40">id: {agent.agent_id}</span>

        <Link href={`/agent/${agent.agent_id}`}>
          <i className="bx bx-link-external"></i>
        </Link>
      </div>

      <div>
        <h4>
          name, os icon, notif/alert some details like cpu usage, memory usage,
          status on/offline
        </h4>
      </div>

      <div className="flex items-center justify-end text-gray-500/40 text-xs">
        created at: {new Date(agent.created_at).toLocaleString()}
      </div>
    </div>
  );
};

export default AgentCard;
