import React from "react";
import { HoverCard } from "radix-ui";
import { convertSize } from "@/lib/utils";

interface SimpleMetricsProps {
  // metrics: {
  //   title: string;
  //   icon: string;
  //   color: string;
  //   alt: string;
  // }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  agent: any;
}

const SimpleMetrics: React.FC<SimpleMetricsProps> = ({ agent }) => {
  const simpleMetrics = [
    {
      title: "CPU (%)",
      icon: "memory_alt",
      color: "text-blue-500 bg-blue-100",
      alt: "cpu",
    },
    {
      title: "Memory (%)",
      icon: "memory",
      color: "text-red-500 bg-red-100",
      alt: "memory",
    },
    {
      title: "Disk (%)",
      icon: "storage",
      color: "text-green-500 bg-green-100",
      alt: "disk",
    },
    {
      title: "Network",
      icon: "swap_vert",
      color: "text-purple-500 bg-purple-100",
      alt: "network",
    },
  ];

  console.log("simple agent", agent);

  return (
    <div className="flex items-center justify-evenly">
      {simpleMetrics.map((item, index) => (
        <HoverCard.Root openDelay={0} closeDelay={0} key={index}>
          <HoverCard.Trigger asChild>
            <div
              className={`${item.color} py-1 px-4 rounded-md flex flex-col gap-1 items-center`}
            >
              <span className="material-symbols-rounded">{item.icon}</span>
              <p className="font-bold text-xs">
                {agent.latest_metrics[item.alt].cpu_percent}
                {agent.latest_metrics[item.alt].disk_space_percent}
                {agent.latest_metrics[item.alt].percent}
                {
                  agent.latest_metrics[item.alt].active_interfaces[0]
                    .total_bytes
                }
              </p>
            </div>
          </HoverCard.Trigger>
          <HoverCard.Content
            sideOffset={0}
            side="bottom"
            className="HoverCardContent text-white text-xs"
          >
            <div className="p-2 bg-black rounded-md flex-center">
              {item.title}
            </div>
            <HoverCard.Arrow className="fill-black" />
          </HoverCard.Content>
        </HoverCard.Root>
      ))}
    </div>
  );
};

export default SimpleMetrics;
