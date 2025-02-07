/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import AgentCard from "./AgentCard";

interface AgentsListProps {
  agents: any[];
  simpleMetrics: any[];
}

const AgentsList: React.FC<AgentsListProps> = ({ agents, simpleMetrics }) => {
  return (
    <div className="flex-1 flex justify-center">
      <div className="flex flex-wrap justify-center gap-1 max-w-[90%]">
        {agents.map((agent, index) => {
          const device_name =
            agent.device_info.system === "Windows" ? "windows" : "linux";
          return (
            <AgentCard
              key={index}
              agent={agent}
              device_name={device_name}
              simpleMetrics={simpleMetrics}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AgentsList;
