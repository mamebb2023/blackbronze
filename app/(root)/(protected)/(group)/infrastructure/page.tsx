"use client";

import Title from "@/components/Dashboard/Title";
import Tracker from "@/components/Dashboard/Tracker";
import Loading from "@/components/shared/Loading";
import { IAgent } from "@/models/agent.modes";
import Image from "next/image";
import Link from "next/link";
import { HoverCard } from "radix-ui";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [agents, setAgents] = useState<IAgent[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

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
        console.log("data.agents", data.agents);
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
                            className="flex-center p-1 rounded-full hover:bg-gray-500/10"
                          >
                            <i className="bx bx-link-external"></i>
                          </Link>
                        </div>

                        {/* agent/server details */}
                        <div className="p-2 flex">
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
                        <div className="p-2 flex-center">
                          {/* svg called cpu.svg */}
                          <div className="flex-center flex-col text-red-600">
                            {/* <Image
                              src="/icons/icon.svg"
                              width={20}
                              height={20}
                              alt="cpu"
                              className="fill-red-500"
                            /> */}
                            <span className="material-icons">star</span>
                            <p className="font-bold">CPU</p>
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
