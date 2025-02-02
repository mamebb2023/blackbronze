"use client";

import Title from "@/components/Dashboard/Title";
import Tracker from "@/components/Dashboard/Tracker";
import Loading from "@/components/shared/Loading";
import { KBtoMB } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { HoverCard } from "radix-ui";
import React, { useEffect, useState } from "react";

const Page = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [agents, setAgents] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const simpleMetrics = [
    {
      title: "CPU (%)",
      icon: "memory_alt",
      color: "text-blue-500 bg-blue-100",
      alt: "cpu_usage",
    },
    {
      title: "Memory (%)",
      icon: "memory",
      color: "text-red-500 bg-red-100",
      alt: "memory_usage",
    },
    {
      title: "Disk (%)",
      icon: "storage",
      color: "text-green-500 bg-green-100",
      alt: "disk_usage",
    },
    {
      title: "Network (up/down, MB/s)",
      icon: "swap_vert",
      color: "text-purple-500 bg-purple-100",
      alt: "network_usage",
    },
  ];

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const token =
          localStorage.getItem("token") || sessionStorage.getItem("token");

        if (!token) {
          throw new Error("No authentication token found.");
        }

        const response = await fetch("/api/agent", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch agents: ${response.statusText}`);
        }

        const data = await response.json();
        setAgents(data.agents);
      } catch (error) {
        console.error("Error fetching agents:", error);
        setError("Failed to fetch agents. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  return (
    <div className="flex flex-col flex-1">
      <Title title="Infrastructure" bx_icon="bx bx-server" />
      <Tracker />

      {error || loading ? (
        <div className="flex-center flex-1">
          <h6 className="h6 font-normal">
            {error && (
              <p className="text-red-500">
                <span className="font-bold">Error</span>: {error}
              </p>
            )}
            {loading && <Loading />}
          </h6>
        </div>
      ) : (
        <div className="flex-center flex-1">
          {agents && agents.length > 0 ? (
            <div className="flex-1 flex justify-center">
              <div className="flex flex-wrap justify-center gap-1 max-w-[90%]">
                {agents.map((agent, index) => {
                  const device_name =
                    agent.device_info.system === "Windows"
                      ? "windows"
                      : "linux";

                  return (
                    <HoverCard.Root openDelay={0} closeDelay={0} key={index}>
                      <HoverCard.Trigger asChild>
                        <div className="relative flex-center text-5xl text-green-400 hover:text-green-500 transition-all">
                          <i className="bx bxs-square rotate-45" />
                        </div>
                      </HoverCard.Trigger>
                      <HoverCard.Content
                        sideOffset={-3}
                        side="top"
                        className="HoverCardContent w-[300px] bg-white rounded-md p-2"
                      >
                        {/* agent-id and link */}
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500/60">
                            id: {agent.agent_id}
                          </span>
                          <Link
                            href={`/agent/${agent.agent_id}`}
                            className="flex-center p-2 rounded-full hover:bg-gray-500/10"
                          >
                            <i className="bx bx-link-external"></i>
                          </Link>
                        </div>

                        {/* agent/server details */}
                        <div className="p-2 flex items-center">
                          <div className="flex-1">
                            <span className="block text-xs text-gray-500/60">
                              public ip:{" "}
                              <span className="font-bold">
                                {agent.device_info.public_ip}
                              </span>
                            </span>
                            <p className="font-bold">
                              {agent.device_info.hostname}
                            </p>
                            <p className="text-xs">
                              {agent.device_info.machine} -{" "}
                              {agent.device_info.version}
                            </p>
                          </div>

                          <div className="">
                            <Image
                              src={`/os/${device_name}${
                                device_name === "windows" &&
                                `-${agent.device_info.release}`
                              }.png`}
                              width={35}
                              height={35}
                              alt={`${agent.device_info.system}${agent.device_info.release}`}
                            />
                          </div>
                        </div>

                        {/* simple meticses showen like cpu, memory, disk, network/data usages */}
                        <div className="my-2 w-full p-1 flex flex-col gap-1">
                          <p className="text-xs text-gray-500/60">
                            Latest Record:{" "}
                            {new Date(
                              agent.latest_metrics.timestamp
                            ).toLocaleString()}
                          </p>
                          <div className="flex items-center justify-evenly">
                            {simpleMetrics.map((item, index) => (
                              <HoverCard.Root
                                openDelay={0}
                                closeDelay={0}
                                key={index}
                              >
                                <HoverCard.Trigger asChild>
                                  <div
                                    className="flex flex-col items-center gap-1"
                                    key={index}
                                  >
                                    <div
                                      className={`py-1 px-4 rounded-md flex flex-col gap-1 items-center ${item.color}`}
                                    >
                                      <span className="material-symbols-rounded">
                                        {item.icon}
                                      </span>
                                      <p className="font-bold text-xs">
                                        {item.alt !== "network_usage" ? (
                                          agent.latest_metrics[`${item.alt}`]
                                        ) : (
                                          <span>
                                            {KBtoMB(
                                              agent.latest_metrics[
                                                `network_usage`
                                              ].upload
                                            )}
                                            /
                                            {KBtoMB(
                                              agent.latest_metrics[
                                                `network_usage`
                                              ].download
                                            )}
                                          </span>
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                </HoverCard.Trigger>
                                <HoverCard.Content
                                  sideOffset={0}
                                  side="bottom"
                                  className="HoverCardContent text-white text-xs"
                                >
                                  <div className="p-2 bg-black rounded-md">
                                    {item.title}
                                  </div>
                                  <HoverCard.Arrow className="fill-black" />
                                </HoverCard.Content>
                              </HoverCard.Root>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-end text-gray-500/60 text-xs">
                          created at:{" "}
                          <span className="font-bold">
                            {new Date(agent.created_at).toLocaleString()}
                          </span>
                        </div>
                        <HoverCard.Arrow className="fill-white" />
                      </HoverCard.Content>
                    </HoverCard.Root>
                  );
                })}
              </div>
            </div>
          ) : (
            <p>No server/agents available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
