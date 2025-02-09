import React from "react";
import { HoverCard } from "radix-ui";
import Image from "next/image";
import Link from "next/link";
import SimpleMetrics from "./SimpleMetrics";
import { getTimeAgo } from "@/lib/utils";

interface AgentCardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  agent: any;
  device_name: string;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, device_name }) => {
  return (
    <HoverCard.Root openDelay={0} closeDelay={0}>
      <HoverCard.Trigger asChild>
        <div
          className={`relative flex-center text-5xl transition-all ${
            agent.latest_metrics.status === "online"
              ? "text-green-400 hover:text-green-500"
              : "text-gray-400 hover:text-gray-500"
          }`}
        >
          <i className="bx bxs-square rotate-45" />
        </div>
      </HoverCard.Trigger>
      <HoverCard.Content
        sideOffset={-3}
        side="top"
        className="HoverCardContent w-[300px] bg-white rounded-md p-2"
      >
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500/60">id: {agent.agent_id}</span>
          <Link
            href={`/infrastructure/map/${agent.agent_id}`}
            className="flex-center p-2 rounded-full hover:bg-gray-500/10"
          >
            <i className="bx bx-link-external"></i>
          </Link>
        </div>

        <div className="p-2 flex items-center">
          <div className="flex-1">
            <span className="block text-xs text-gray-500/60">
              public ip:{" "}
              <span className="font-bold">{agent.device_info.public_ip}</span>
            </span>
            <p className="font-bold">{agent.device_info.hostname}</p>
            <p className="text-xs">
              {agent.device_info.node_name} - {agent.device_info.machine} -{" "}
              {agent.device_info.version}
            </p>
          </div>

          <div className="">
            <Image
              src={`/os/${device_name}${
                device_name === "windows" && `-${agent.device_info.release}`
              }.png`}
              width={35}
              height={35}
              alt={`${agent.device_info.system}${agent.device_info.release}`}
            />
          </div>
        </div>

        <div className="my-2 w-full p-1 flex flex-col gap-1">
          <p className="text-xs text-gray-500/60">
            Latest Record: {getTimeAgo(agent.latest_metrics.timestamp)}
          </p>
          <SimpleMetrics agent={agent} />
        </div>

        <div className="flex items-center justify-between text-gray-500/60 text-xs">
          <div
            className={`text-xs rounded-full py-1 font-bold px-2 ${
              agent.latest_metrics.status === "online"
                ? "bg-green-200 text-green-600"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {agent.latest_metrics.status}
          </div>
          <div>
            created at:{" "}
            <span className="font-bold">
              {new Date(agent.created_at).toLocaleString()}
            </span>
          </div>
        </div>
        <HoverCard.Arrow className="fill-white" />
      </HoverCard.Content>
    </HoverCard.Root>
  );
};

export default AgentCard;
