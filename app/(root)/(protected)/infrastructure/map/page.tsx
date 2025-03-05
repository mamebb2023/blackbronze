"use client";

import { HoverCard } from "radix-ui";
import ErrorOrLoading from "@/components/Dashboard/ErrorOrLoading";
import NoData from "@/components/Dashboard/NoData";
import Title from "@/components/Dashboard/Title";
import Tracker from "@/components/Dashboard/Tracker";
import { getTimeAgo, getToken } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SimpleMetrics from "@/components/Agent/SimpleMetrics";

const Page = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [agents, setAgents] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [updateTrigger, setUpdateTrigger] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdateTrigger((prev) => !prev);
    }, 15000);

    return () => clearInterval(interval); // Correct cleanup function
  }, []);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const token = getToken();
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
        console.log(data.agents);
        setAgents(data.agents);
      } catch (error) {
        console.error("Error fetching agents:", error);
        setError("Failed to fetch agents. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, [updateTrigger]);

  return (
    <div className="flex flex-col flex-1">
      <Title title="Map" bx_icon="bx bx-server" />
      <Tracker />

      {error || loading ? (
        <ErrorOrLoading error={error} loading={loading} />
      ) : (
        <div className="flex-center flex-1">
          {agents && agents.length > 0 ? (
            <div className="flex-1 flex justify-center">
              <div className="flex flex-wrap justify-center gap-1 max-w-[90%]">
                {agents.map((agent, index) => {
                  const device_name = agent?.device_info?.system;

                  return (
                    <HoverCard.Root key={index} openDelay={0} closeDelay={0}>
                      {/* trigger */}
                      <HoverCard.Trigger asChild>
                        <div
                          className={`relative flex-center text-5xl transition-all ${
                            agent?.latest_metrics?.status === "online"
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
                        className="HoverCardContent w-[350px] bg-white rounded-md p-2"
                      >
                        {/* id and link to the host/agent */}
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500/60">
                            host-id: {agent?.agent_id}
                          </span>
                          <Link
                            href={`/infrastructure/map/${agent?.agent_id}`}
                            className="flex-center p-2 rounded-full hover:bg-gray-500/10"
                          >
                            <i className="bx bx-link-external"></i>
                          </Link>
                        </div>

                        {/* simple device info */}
                        <div className="p-2 flex items-center">
                          <div className="flex-1">
                            <span className="block text-xs text-gray-500/60">
                              public ip:{" "}
                              <span className="font-bold">
                                {agent?.latest_metrics?.network.public_ip}
                              </span>
                            </span>
                            <p className="font-bold">
                              {agent?.device_info?.hostname}
                            </p>
                            <p className="text-xs">
                              {agent?.device_info?.node_name} -{" "}
                              {agent?.device_info?.machine} -{" "}
                              {agent?.device_info?.version}
                            </p>
                          </div>

                          <div className="">
                            <Image
                              src={`${
                                device_name === "Windows"
                                  ? `/os/${device_name}-${agent?.device_info?.release}.png`
                                  : `/os/${device_name}.png`
                              }`}
                              width={35}
                              height={35}
                              alt={`${agent?.device_info?.system}-${agent?.device_info?.release}`}
                            />
                          </div>
                        </div>

                        {/* simple latest metrics */}
                        <div className="my-2 w-full p-1 flex flex-col gap-1">
                          <p className="text-xs text-gray-500/60">
                            Latest Record:{" "}
                            {getTimeAgo(agent?.latest_metrics?.timestamp)}
                          </p>
                          <SimpleMetrics agent={agent} />
                        </div>

                        {/* onlinitivity and created at */}
                        <div className="flex items-center justify-between text-gray-500/60 text-xs">
                          <div
                            className={`text-xs rounded-full py-1 font-bold px-2 ${
                              agent?.latest_metrics?.status === "online"
                                ? "bg-green-200 text-green-600"
                                : "bg-gray-200 text-gray-600"
                            }`}
                          >
                            {agent?.latest_metrics?.status}
                          </div>
                          <div>
                            created at:{" "}
                            <span className="font-bold">
                              {new Date(agent?.created_at).toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <HoverCard.Arrow className="fill-white" />
                      </HoverCard.Content>
                    </HoverCard.Root>
                  );
                })}
              </div>
            </div>
          ) : (
            <NoData />
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
